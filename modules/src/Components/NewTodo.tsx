// Components/NewTodo.tsx
import { FormEvent, useState } from "react";

import "../App.css";
import { useNavigate } from "react-router-dom";

const NewTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title, description, completed: false }),
      }).then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>TODO's</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewTodo;
