import Select from "react-select";
import { useState } from "react";

import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, onDelete, onEdit, onToggleStatus }) => {
  const [showStatus, setShowStatus] = useState(["All"]);

  const status = [
    { label: "All", value: 1 },
    { label: "Pending", value: 2 },
    { label: "Completed", value: 3 },
  ];

  // Changing Filter - All, Pending, Completed
  const onChange = (item, name) => {
    setShowStatus(item.map((i) => i.label));
  };

  const todoItems = (filteredTodo) => {
    return (
      <ToDoItem
        key={filteredTodo.id}
        todo={filteredTodo}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleStatus={onToggleStatus}
      />
    );
  };

  return (
    <>
      <Select
        options={status}
        placeholder="Select To-Do Status"
        onChange={onChange}
        isMulti
      />

      {showStatus.includes("All") && (
        <>
          <h2>All To-Do Items</h2>
          {todos.map((filteredTodo) => todoItems(filteredTodo))}
        </>
      )}

      {showStatus.includes("Pending") && (
        <>
          <h2>Pending</h2>
          {todos
            .filter((todo) => todo.status === false)
            .map((filteredTodo) => todoItems(filteredTodo))}
        </>
      )}

      {showStatus.includes("Completed") && (
        <>
          <h2>Completed</h2>
          {todos
            .filter((todo) => todo.status === true)
            .map((filteredTodo, index) => todoItems(filteredTodo))}
        </>
      )}

      <p style={{ marginTop: "20px" }}>
        **Double-click To-Do item to mark as completed.
      </p>
    </>
  );
};

export default ToDoList;
