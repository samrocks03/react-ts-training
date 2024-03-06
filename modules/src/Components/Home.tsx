// Components/Home.tsx
import { /*useEffect,*/ useState, FormEvent, useEffect } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "../Hooks/UseFetch";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Home = () => {
  const { loading, error, data } = useFetch();
  const [tasks, setTasks] = useState<Todo[]>(data);
  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  // ------------------ submit Handler ------------------
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() !== "" && description.trim() !== "") {
      setTasks([
        ...tasks,
        { id: uuidv4(), title, description, completed: false },
      ]);
      setTitle("");
      setDescription("");
    } else {
      alert("Title and description can't be empty");
    }
  };

  // ---------------------------- Delete Task ----------------------------
  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // ----------------------------- Toggle Check ----------------------------
  const toggleComplete = (id: string, checked: boolean) => {
    // console.log(index);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: checked } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(()=>{
    setTasks(data);
  },[data])

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

      {
        loading ? (
          <p>Loading...</p>    
        ) : error? (
          <p>{error}</p>
        ) : (          
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              taskData={task}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))          
        )
      }
    </div>
  );
};

export default Home;
