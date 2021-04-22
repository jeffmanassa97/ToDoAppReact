import { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todos, setTodos] = useState([]);

  // Set Todos from JSON Server after Render
  useEffect(() => {
    const getTodos = async () => {
      const serverData = await fetchTodos();
      setTodos(serverData);
    };

    getTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();
    console.log("JSON Server\n", data);
    return data;
  };

  const fetchTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await response.json();
    return data;
  };

  const addTodo = async (todo) => {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    const data = await response.json();
    setTodos([...todos, data]);
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = async (id, newTodo) => {
    newTodo.id = id;
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    const data = await response.json();
    setTodos((todos) => todos.map((todo) => (todo.id === id ? data : todo)));
  };

  const toggleStatus = async (id) => {
    const updateThis = await fetchTodo(id);
    editTodo(id, { text: updateThis.text, status: !updateThis.status });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const toggleAddTodo = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="container">
      <Header onAddClick={toggleAddTodo} showAdd={showAdd} />
      {showAdd && <AddTodo onAdd={addTodo} />}

      {todos.length > 0 ? (
        <ToDoList
          todos={todos}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggleStatus={toggleStatus}
        />
      ) : (
        "No To-Do's set"
      )}
    </div>
  );
}

export default App;
