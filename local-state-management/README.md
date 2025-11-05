# Complete Guide: State Management for Todo CRUD Operations

## 🎯 Learning Objectives

Master the three fundamental state management patterns:
1. **Adding** - Creating and appending new items to state
2. **Updating** - Modifying existing items immutably
3. **Deleting** - Removing items from state

---

## 📚 Core Concept: Immutability

### Why Immutability Matters

React uses **reference comparison** to detect changes. When you mutate an object or array directly, the reference stays the same, so React doesn't know to re-render.

```typescript
// ❌ WRONG - Mutating state directly
todos.push(newTodo);        // Same array reference
todo.completed = true;      // Same object reference
setTodos(todos);            // React says "same reference, no update needed"

// ✅ CORRECT - Creating new references
setTodos([...todos, newTodo]);           // New array reference
setTodos(todos.map(t => t.id === id      // New array reference
  ? {...t, completed: true}              // New object reference
  : t
));
```

**The Golden Rule:** Never mutate state directly. Always create a new array/object.

---

## 1️⃣ ADDING ITEMS TO STATE

### Pattern 1: Simple Append (Most Common)

```typescript
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');

const addTodo = () => {
  // Step 1: Validate input
  if (inputValue.trim() === '') {
    alert('Please enter a todo!');
    return;
  }
  
  // Step 2: Create new todo object
  const newTodo = {
    id: Date.now(),              // Simple unique ID
    text: inputValue,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  // Step 3: Create new array with existing + new todo
  setTodos([...todos, newTodo]);
  
  // Step 4: Clear input field
  setInputValue('');
};
```

**Key Points:**
- `...todos` spreads all existing todos
- `newTodo` is added at the end
- Creates entirely new array (immutable)
- Order: old items first, new item last

### Pattern 2: Prepend (Add to Beginning)

```typescript
const addTodoToTop = () => {
  const newTodo = {
    id: Date.now(),
    text: inputValue,
    completed: false
  };
  
  // New item FIRST, then existing todos
  setTodos([newTodo, ...todos]);
  setInputValue('');
};
```

**When to use:** Latest items should appear first (like social media feeds)

### Pattern 3: Add at Specific Position

```typescript
const addTodoAtPosition = (position) => {
  const newTodo = {
    id: Date.now(),
    text: inputValue,
    completed: false
  };
  
  // Split array at position and insert
  const updatedTodos = [
    ...todos.slice(0, position),    // Items before position
    newTodo,                         // New item
    ...todos.slice(position)         // Items from position onward
  ];
  
  setTodos(updatedTodos);
  setInputValue('');
};

// Usage: addTodoAtPosition(2) inserts at index 2
```

### Pattern 4: Using Functional Update (Advanced)

```typescript
const addTodo = () => {
  const newTodo = {
    id: Date.now(),
    text: inputValue,
    completed: false
  };
  
  // Function receives the LATEST state
  setTodos(prevTodos => [...prevTodos, newTodo]);
  setInputValue('');
};
```

**When to use:** 
- When new state depends on previous state
- Inside async functions or event handlers
- Prevents stale state issues

**Why it's safer:**
```typescript
// ❌ Can cause bugs with rapid clicks
const addTodo = () => {
  setTodos([...todos, newTodo]);  // Uses todos from when function was created
};

// ✅ Always uses latest state
const addTodo = () => {
  setTodos(prevTodos => [...prevTodos, newTodo]);  // Guaranteed latest
};
```

### Pattern 5: Add with Validation

```typescript
const addTodoWithValidation = () => {
  // Validation checks
  if (inputValue.trim() === '') {
    alert('Todo cannot be empty!');
    return;
  }
  
  if (inputValue.length < 3) {
    alert('Todo must be at least 3 characters!');
    return;
  }
  
  // Check for duplicates
  const isDuplicate = todos.some(
    todo => todo.text.toLowerCase() === inputValue.toLowerCase()
  );
  
  if (isDuplicate) {
    alert('This todo already exists!');
    return;
  }
  
  // All validations passed - add the todo
  const newTodo = {
    id: Date.now(),
    text: inputValue.trim(),
    completed: false,
    priority: 'medium',
    tags: []
  };
  
  setTodos([...todos, newTodo]);
  setInputValue('');
};
```

### Pattern 6: Add Multiple Items

```typescript
const addMultipleTodos = (textArray) => {
  const newTodos = textArray.map((text, index) => ({
    id: Date.now() + index,  // Ensure unique IDs
    text: text,
    completed: false
  }));
  
  // Spread existing + spread new array
  setTodos([...todos, ...newTodos]);
};

// Usage:
// addMultipleTodos(['Buy milk', 'Walk dog', 'Code']);
```

---

## 2️⃣ UPDATING ITEMS IN STATE

### Pattern 1: Toggle Boolean Property

```typescript
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }  // Toggle this one
      : todo                                      // Keep others same
  ));
};
```

**How it works:**
1. `.map()` creates a new array
2. For each todo, check if it's the one to update
3. If yes: create new object with spread + updated property
4. If no: return original todo unchanged
5. React gets new array reference → re-renders

**Visual Breakdown:**
```typescript
// Before: [{ id: 1, completed: false }, { id: 2, completed: false }]
toggleTodo(1);
// After:  [{ id: 1, completed: true }, { id: 2, completed: false }]
//          └── NEW OBJECT ──┘          └── SAME OBJECT ──┘
```

### Pattern 2: Update Text/String Property

```typescript
const updateTodoText = (id, newText) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, text: newText }
      : todo
  ));
};

// Usage in component:
<input
  value={todo.text}
  onChange={(e) => updateTodoText(todo.id, e.target.value)}
/>
```

### Pattern 3: Update Multiple Properties

```typescript
const updateTodo = (id, updates) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, ...updates }  // Spread existing + spread updates
      : todo
  ));
};

// Usage:
updateTodo(1, { 
  text: 'Updated text', 
  priority: 'high',
  dueDate: '2025-12-31'
});
```

**How spread order matters:**
```typescript
// Order 1: updates override todo properties
{ ...todo, ...updates }

// Order 2: todo properties override updates
{ ...updates, ...todo }  // Usually not what you want!
```

### Pattern 4: Update Nested Properties

```typescript
const todos = [
  {
    id: 1,
    text: 'Learn React',
    metadata: {
      priority: 'high',
      category: 'learning',
      tags: ['react', 'typescript']
    }
  }
];

// Update nested object
const updateTodoPriority = (id, newPriority) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          metadata: {
            ...todo.metadata,           // Spread existing metadata
            priority: newPriority       // Override priority
          }
        }
      : todo
  ));
};

// Update array inside nested object
const addTagToTodo = (id, newTag) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          metadata: {
            ...todo.metadata,
            tags: [...todo.metadata.tags, newTag]  // Add to tags array
          }
        }
      : todo
  ));
};
```

### Pattern 5: Conditional Updates

```typescript
const toggleAllTodos = (completed) => {
  setTodos(todos.map(todo => ({
    ...todo,
    completed: completed  // Set all to same value
  })));
};

// Usage:
// toggleAllTodos(true)  - Mark all as completed
// toggleAllTodos(false) - Mark all as incomplete
```

### Pattern 6: Update Based on Current Value

```typescript
const incrementCounter = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, count: todo.count + 1 }  // Use current value
      : todo
  ));
};

const appendToDescription = (id, text) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, description: todo.description + ' ' + text }
      : todo
  ));
};
```

### Pattern 7: Update with Timestamp

```typescript
const updateTodoWithTimestamp = (id, updates) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { 
          ...todo, 
          ...updates,
          updatedAt: new Date().toISOString()  // Track when updated
        }
      : todo
  ));
};
```

---

## 3️⃣ DELETING ITEMS FROM STATE

### Pattern 1: Delete by ID (Most Common)

```typescript
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};
```

**How it works:**
1. `.filter()` creates a new array
2. Only keeps todos where `todo.id !== id`
3. Effectively removes the matching todo
4. React gets new array reference → re-renders

**Visual Breakdown:**
```typescript
// Before: [{ id: 1 }, { id: 2 }, { id: 3 }]
deleteTodo(2);
// After:  [{ id: 1 }, { id: 3 }]
//         └── Kept ──┘  └── Kept ──┘  (id: 2 filtered out)
```

### Pattern 2: Delete by Index

```typescript
const deleteTodoByIndex = (index) => {
  setTodos(todos.filter((_, i) => i !== index));
};

// Or using slice:
const deleteTodoByIndex = (index) => {
  setTodos([
    ...todos.slice(0, index),        // Items before index
    ...todos.slice(index + 1)        // Items after index
  ]);
};
```

**When to use:** Rarely! Prefer deleting by ID. Only use if you don't have IDs.

### Pattern 3: Delete Multiple Items

```typescript
const deleteTodosByIds = (idsToDelete) => {
  setTodos(todos.filter(todo => !idsToDelete.includes(todo.id)));
};

// Usage:
// deleteTodosByIds([1, 3, 5]) - Deletes todos with ids 1, 3, and 5
```

### Pattern 4: Delete with Confirmation

```typescript
const deleteTodoWithConfirm = (id) => {
  const todo = todos.find(t => t.id === id);
  
  if (window.confirm(`Delete "${todo.text}"?`)) {
    setTodos(todos.filter(t => t.id !== id));
  }
};
```

### Pattern 5: Delete Completed Todos

```typescript
const deleteCompletedTodos = () => {
  // Keep only incomplete todos
  setTodos(todos.filter(todo => !todo.completed));
};

// Or be explicit:
const deleteCompletedTodos = () => {
  setTodos(todos.filter(todo => todo.completed === false));
};
```

### Pattern 6: Delete All

```typescript
const deleteAllTodos = () => {
  if (window.confirm('Delete all todos? This cannot be undone!')) {
    setTodos([]);  // Set to empty array
  }
};
```

### Pattern 7: Soft Delete (Archive)

```typescript
const archiveTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, archived: true, archivedAt: new Date().toISOString() }
      : todo
  ));
};

// Show only non-archived
const activeTodos = todos.filter(todo => !todo.archived);

// Permanently delete archived items
const deleteArchivedTodos = () => {
  setTodos(todos.filter(todo => !todo.archived));
};
```

---

## 🎯 COMBINED PATTERNS: Real-World Examples

### Example 1: Complete Todo Management System

```typescript
import { useState } from 'react';

function TodoManager() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // ===== CREATE =====
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };
  
  // ===== UPDATE =====
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  const updateTodoText = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: newText }
        : todo
    ));
  };
  
  const setPriority = (id, priority) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, priority }
        : todo
    ));
  };
  
  // ===== DELETE =====
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  const deleteAll = () => {
    if (window.confirm('Delete all todos?')) {
      setTodos([]);
    }
  };
  
  return (
    <div>
      {/* Add Todo */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      
      {/* Bulk Actions */}
      <button onClick={deleteCompleted}>Delete Completed</button>
      <button onClick={deleteAll}>Delete All</button>
      
      {/* Todo List */}
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <input
            value={todo.text}
            onChange={(e) => updateTodoText(todo.id, e.target.value)}
          />
          <select
            value={todo.priority}
            onChange={(e) => setPriority(todo.id, e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Edit Mode Pattern

```typescript
function EditableTodoList() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  const saveEdit = () => {
    setTodos(todos.map(todo =>
      todo.id === editingId
        ? { ...todo, text: editText }
        : todo
    ));
    setEditingId(null);
    setEditText('');
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <span>{todo.text}</span>
              <button onClick={() => startEditing(todo)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔍 DEBUGGING TIPS

### Problem 1: State Not Updating

```typescript
// ❌ WRONG - Direct mutation
const addTodo = () => {
  todos.push(newTodo);  // Mutates array
  setTodos(todos);      // Same reference!
};

// ✅ CORRECT - New array
const addTodo = () => {
  setTodos([...todos, newTodo]);  // New reference
};
```

### Problem 2: Stale State

```typescript
// ❌ Can have stale state
const handleMultipleClicks = () => {
  setTodos([...todos, todo1]);  // Uses current todos
  setTodos([...todos, todo2]);  // Still uses OLD todos!
};

// ✅ Use functional updates
const handleMultipleClicks = () => {
  setTodos(prev => [...prev, todo1]);
  setTodos(prev => [...prev, todo2]);  // Uses updated todos
};
```

### Problem 3: Lost Updates

```typescript
// ❌ Overwrites other properties
const updateText = (id, text) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { text }  // LOST: completed, priority, etc.
      : todo
  ));
};

// ✅ Spread to keep other properties
const updateText = (id, text) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, text }  // Keeps all other properties
      : todo
  ));
};
```

### Debugging Checklist:
- [ ] Am I creating new array/object references?
- [ ] Am I using spread operator `...`?
- [ ] Am I avoiding direct mutations?
- [ ] Am I using functional updates when needed?
- [ ] Are my keys unique and stable?

---


## 📊 COMPARISON TABLE

| Operation | Array Method | Creates New Array? | Use Case |
|-----------|-------------|-------------------|----------|
| Add to end | `[...arr, item]` | ✅ Yes | Most common |
| Add to start | `[item, ...arr]` | ✅ Yes | Latest first |
| Update item | `.map()` | ✅ Yes | Modify one/many |
| Delete item | `.filter()` | ✅ Yes | Remove items |
| Sort | `.sort()` with spread | ✅ Yes (with `[...arr].sort()`) | Reorder |
| Find | `.find()` | ❌ No | Read only |

---

## 🎯 KEY TAKEAWAYS

1. **Always create new references** - Use spread operator, map, filter
2. **Never mutate directly** - No push, pop, splice, or property assignment on state
3. **Use functional updates** - When new state depends on old state
4. **Validate before updating** - Check input, prevent duplicates
5. **Keep it simple** - Start with basic patterns, add complexity as needed

---

## 🚀 NEXT STEPS

1. Practice each pattern individually
2. Combine patterns in a real project
3. Add error handling and validation
4. Explore useReducer for complex state logic
5. Learn about React Context for global state

Remember: **Immutability is the foundation of React state management!**