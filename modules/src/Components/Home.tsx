// Components/Home.tsx
import React, { useEffect, useState, FormEvent } from "react";
import Task from "./Task";

const Home: React.FC = () => {
  const initialArray: {
    title: string;
    description: string;
    completed: boolean;
  }[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  const [tasks, setTasks] = useState(initialArray);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  // ------------------ submit Handler ------------------
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() !== "" && description.trim() !== "") {
      setTasks([...tasks, { title, description, completed: false }]);
      setTitle("");
      setDescription("");
    } else {
      alert("Title and description can't be empty");
    }
  };

  // ---------------------------- Delete Task ----------------------------
  const deleteTask = (index: number) => {
    const filteredArr = tasks.filter((_val, i) => {
      // you need _val, otherwise it'd throw u error that, their is un-intentional comparison in it
      return i !== index;
    });
    setTasks(filteredArr);
  };

  // ----------------------------- Toggle Check ----------------------------
  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };


  // ----------------------------- Setting in Local Storage ----------------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  // ----------------------------- Filter completed tasks ------------------------------
  const filteredTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : tasks;

    
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

      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "All  Tasks" : "Show Completed Tasks"}
      </button>

      {filteredTasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          description={task.description}
          completed={task.completed}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
