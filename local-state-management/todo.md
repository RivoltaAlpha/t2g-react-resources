
# React Learning Project: Interactive Todo List
This project covers:
1. **useState Hook** - Managing component state
2. **Rendering Lists** - Using `.map()` to render arrays
3. **React Keys** - Understanding why keys matter
4. **Event Handling** - Responding to user interactions
5. **State Updates** - Immutable update patterns

---
## 🔑 Key Concepts Summary

### useState Checklist:
- [ ] Call useState at the top level of component
- [ ] Use descriptive names: `[todos, setTodos]` not `[data, setData]`
- [ ] Never mutate state directly
- [ ] Use setter function to update

### Map & Keys Checklist:
- [ ] Use `.map()` to render arrays
- [ ] Always provide a `key` prop
- [ ] Keys should be unique and stable (not indices if list changes)
- [ ] Keys help React identify which items changed

### Common Mistakes to Avoid:
1. **Mutating state**: `todos.push(item)` ❌
2. **Index as key**: `key={index}` (when list can change) ❌
3. **Forgetting keys**: Results in console warnings ❌
4. **Not using spread operator**: `[...todos, newItem]` ✅

---

```typescript
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos]: any = useState([]);
  const [inputValue, setInputvalue] = useState('');
  const [users, setUsers] = useState([])

  // setTodos([...todos, newTodo]);
  // settodos(todos.map((t => t.id) === id
  // ? {...t, completed: true}
  // : t
  // ))

  // todos.push(newTodo);
  // todo.completed = true;


// add Todo
const addTodo = () => {
  // validate input
  if(inputValue.trim() === '') {
    alert('Please enter a todo!')
    return;
  }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };

      // create a new arrray with the already existing todos
      // adding it to the end of the array
      // uses todods from when the fnc was created 
    setTodos([...todos, newTodo]);
    setInputvalue('');
}

const firstTodo = () => {
      const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };

      // create a new arrray with the already existing todos
      // new item first existing items last 
    setTodos([newTodo, ...todos]);
}

const addToPosition = (position: number) => {
        const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedTodods = [
      ...todos.slice(0, position),
      newTodo,
      ...todos.slice(position)
    ]

    setTodos(updatedTodods);
    setInputvalue('')
}

const addFuncTodo = () => {
        const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };

    // fnct receiving the latest state
    // inside an asnc fnc
    // when the previous state depends on the new state 
    // prevent state issue 
    // gurantees latest state
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputvalue("")
}

const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id == id
    ? {...todo, completed: !todo.completed}
    : todo
  ));
};

toggleTodo(1)

const updateUser = (user_id: number, updates: any) => {
  setUsers(users.map(user => 
    user.id === user_id
    ? {...user, ...updates}
    : user
  ));
};

updateUser(1, {
  user_id: 1,
  name: "Tiff"
})

const deleteTodo = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id))
}

deleteTodo(1);


  return (
    <>
      <div>
        <button className="button p-4 rounded-2xl bg-amber-950 text-white" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App

```
---

## 🚀 Extension Challenges

### Beginner:
1. Add a "Clear All Completed" button
2. Show a message when all todos are completed
3. Add emoji picker for each todo

### Intermediate:
1. Add local storage persistence
2. Implement drag-and-drop reordering
3. Add todo categories with color coding
4. Create an "undo" feature

### Advanced:
1. Add animations when todos are added/removed
2. Implement search functionality
3. Add keyboard shortcuts (Ctrl+Enter to add, etc.)
4. Create a "focus mode" that shows one todo at a time

---

## 📖 Additional Resources

### Recommended Reading:
- React Docs: useState Hook
- React Docs: Lists and Keys
- MDN: Array.map()
- MDN: Spread Syntax

### Practice Ideas:
- Build a shopping cart
- Create a task timer with list of tasks
- Make a poll with options rendered from array
- Design a gradient generator with saved favorites list

---

## ✅ Assessment Criteria

Students should be able to:
- [ ] Explain what useState does and why we need it
- [ ] Create and update different types of state (string, boolean, array)
- [ ] Use map() to render a list of components
- [ ] Explain why keys are important
- [ ] Add, update, and remove items from array state immutably
- [ ] Handle user input with controlled components
- [ ] Debug common state-related issues

---

## 🎓 Quiz Questions

1. What does `useState(0)` return?
2. Why must we use the setter function instead of modifying state directly?
3. What does the `key` prop do in React?
4. What's the difference between `.map()` and `.forEach()`?
5. How do you add an item to an array state without mutating it?
6. When is it okay to use array index as a key?

**Answers at bottom of document**

---

## 📝 Homework Assignment

Build a "Reading List" application that:
1. Lets users add books (title and author)
2. Mark books as "read" or "unread"
3. Filter by read status
4. Delete books from the list
5. Show total count of read vs unread

**Requirements:**
- Use at least 3 useState hooks
- Render books using map()
- Use proper keys
- Apply all immutable update patterns learned

---

## Quiz Answers:
1. An array: `[currentValue, setterFunction]`
2. React needs to detect changes to know when to re-render; direct mutation doesn't trigger updates
3. Helps React identify which items changed/added/removed for efficient updates
4. `.map()` returns a new array; `.forEach()` returns nothing and is for side effects only
5. Use spread operator: `setItems([...items, newItem])` or concat: `setItems(items.concat(newItem))`
6. Only when the list never changes order and items are never deleted/inserted
