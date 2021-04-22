import { useState } from "react";

const AddTodo = ({ edit, onAdd, todo }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add text.");
      return;
    }
    onAdd({
      // id auto-generated on adding to server
      text: text,
      status: false,
    });
    setText("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <>
          <div className="form-control">
            <label>Text</label>
            <input
              type="text"
              placeholder={edit ? todo.text  : "Add To-Do"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <input type="submit" value={edit ? "Update To-Do"  : "Save To-Do"} className="btn btn-block" />
        </>
    </form>
  );
};

export default AddTodo;
