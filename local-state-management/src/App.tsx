import { useEffect, useState } from "react";
import { CheckCircle, Circle, MoonIcon, Plus, Sun, Trash2 } from "lucide-react";
import "./App.css";

function App() {
  const [inputValue, setInputvalue] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // Load theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="max-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div
        className={`p-8 mx-auto flex flex-col justify-center items-center transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900"
            : "bg-linear-to-br from-purple-400 via-pink-500 to-red-500"
        }`}
        style={{
          backgroundImage: isDarkMode
            ? "url('./images/bg-desktop-dark.jpg')"
            : "url('./images/bg-desktop-light.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-row justify-around p-4 items-center">
          <h1
            className={`text-3xl font-bold mb-2 mt-10 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            📝 TODO
          </h1>
          {/* Theme Toggle */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white bg-opacity-20 text-gray-800 hover:bg-opacity-30"
              }`}
            >
              {isDarkMode ? <Sun size={24} /> : <MoonIcon size={24} />}
            </button>
          </div>
        </div>
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputvalue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new todo..."
            className={`flex-1 px-4 py-2 w-72 rounded-2xl p-8 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-800"
            }`}
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>
      <div className="bg-black h-screen max-w-8xl mx-auto p-8">
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div className="max-w-7xl mx-auto p-8">
            <div
              className={`rounded-lg shadow-xl p-6 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-800"
              }`}
            >
              {/* Filter Buttons */}
              <div className="flex gap-2 mb-4">
                {["all", "active", "completed"].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg transition capitalize ${
                      filter === filterType
                        ? "bg-purple-600 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>

              {/* Todo List */}
              <div className="space-y-2">
                {FilteredTodos.length === 0 ? (
                  <div
                    className={`text-center py-8 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {filter === "all"
                      ? "No todos yet! Add one above."
                      : `No ${filter} todos.`}
                  </div>
                ) : (
                  FilteredTodos.map((todo: Todo) => (
                    <div
                      key={todo.id}
                      className={`flex items-center gap-3 p-4 rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`transition ${
                          isDarkMode
                            ? "text-gray-400 hover:text-purple-400"
                            : "text-gray-500 hover:text-purple-600"
                        }`}
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
                            ? isDarkMode
                              ? "line-through text-gray-500"
                              : "line-through text-gray-400"
                            : isDarkMode
                            ? "text-gray-100"
                            : "text-gray-800"
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
              <div
                className={`text-center p-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <p>
                  Total Todos: {stats.total} | Active: {stats.active} |
                  Completed: {stats.completed}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-gray-100 py-4">
        <div className="max-w-7xl mx-auto p-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Teach2Give. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
