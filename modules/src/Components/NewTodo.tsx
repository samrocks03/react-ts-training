// Components/NewTodo.tsx
import { FormEvent, useState } from "react";

import "../App.css";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4 } from "uuid";

const NewTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>();

  const navigate = useNavigate();

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuidv4(),
          title,
          description,
          date,
          completed: false,
        }),
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
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <div className="d-flex mb-3 justify-content-end">
          <input
            type="date"
            className="w-25 d-flex justify-content-center form-control  "
            id="dateField"
            min={getCurrentDate()}
            onChange={(e) => handleChangeDate(e)}
            required
          />

          <button className="container-button" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
