// Components/DisplayIndividualTodo.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "../constants";

// fetch and display a specific todo item based on an ID passed in URL parameters
const DisplayIndividualTodo = () => {
  const param = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [, setCompleted] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_ENDPOINT}/${param.id}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);
      setDate(data.date);


    };

    fetchData();
  }, [param.id]);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
};

export default DisplayIndividualTodo;
