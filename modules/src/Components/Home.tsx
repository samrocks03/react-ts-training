// Components/Home.tsx
import { useEffect, useState, FormEvent } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Home = () => {
  const initialArray: Todo[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );

  // const [id,setId] = useState<number>(0);
  const [tasks, setTasks] = useState<Todo[]>(initialArray);
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
    // const filteredArr = tasks.filter((_val, i) => {
    //   you need _val, otherwise it'd throw u error that, their is un-intentional comparison in it
    //   return i !== index;
    // });
    // setTasks(filteredArr);
  };

  // ----------------------------- Toggle Check ----------------------------
  const toggleComplete = (id: string, checked: boolean) => {
    // console.log(index);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: checked } : task
    );
    setTasks(updatedTasks);
    // const updatedTasks = [...tasks];
    // updatedTasks[index].completed = !updatedTasks[index].completed;
    // setTasks(updatedTasks);
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

      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          taskData={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default Home;
