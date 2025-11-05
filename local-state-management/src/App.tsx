import { useState } from "react";
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import "./App.css";

function App() {
  const [inputValue, setInputvalue] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos]: any = useState([
    { id: 1, text: "React Frontend", completed: false },
    { id: 2, text: "Database Analysis", completed: true },
    { id: 3, text: "Nest Backend", completed: false },
  ]);

  // add Todo
  const addTodo = () => {
    // validate input
    if (inputValue.trim() === "") {
      alert("Please enter a todo!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // create a new arrray with the already existing todos
    // adding it to the end of the array
    // uses todods from when the fnc was created
    setTodos([...todos, newTodo]);
    setInputvalue("");
  };

  interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const FilteredTodos = todos.filter((todo: Todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    if (filter === "all") return !todo.completed || todo.completed;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t: Todo) => !t.completed).length,
    completed: todos.filter((t: Todo) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 Todo List Learning Project
          </h1>

          {/* Stats Display */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputvalue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addTodo}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  filter === filterType
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {FilteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {filter === 'all' ? 'No todos yet! Add one above.' : `No ${filter} todos.`}
              </div>
            ) : (
              FilteredTodos.map((todo: Todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-gray-600 hover:text-purple-600 transition"
                  >
                    {todo.completed ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
