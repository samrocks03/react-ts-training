import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DisplayIndividualTodo = () => {
  const param = useParams();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/todos/${param.id}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed);

      // console.log(data.title);
      console.log(data.description);
      console.log(data.completed);
    };

    fetchData();
  }, [param.id]);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default DisplayIndividualTodo;
