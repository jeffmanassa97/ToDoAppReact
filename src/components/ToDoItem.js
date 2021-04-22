import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import AddTodo from "./AddTodo";

const ToDoItem = ({ todo, onDelete, onEdit, onToggleStatus }) => {
  const [edit, setEdit] = useState({
    id: null,
  });

  const submitEdit = (newTodo) => {
    onEdit(edit.id, newTodo);
    setEdit({
      id: null,
      value: "",
    });
  };

  return (
    <div
      className={`todo ${todo.status ? "complete" : ""}`}
      onDoubleClick={() => onToggleStatus(todo.id)}
    >
      <h3>
        {todo.text}{" "}
        <div className="fa">
          <FaEdit
            style={{ color: "black", cursor: "pointer", marginRight: "10px" }}
            onClick={() => setEdit(edit.id ? { id: null } : { id: todo.id })}
          />
          <FaTimesCircle
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(todo.id)}
          />
        </div>
      </h3>
      {edit.id && <AddTodo edit={edit} onAdd={submitEdit} todo={todo} />}
    </div>
  );
};

export default ToDoItem;
