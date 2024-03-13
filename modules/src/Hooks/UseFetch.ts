//Hooks/UseFetch.tsx

import { useEffect, useState } from "react";
import { Todo } from "../Components/Home";

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); // Explicitly define the type as string
  const [data, setData] = useState<Todo[]>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const refetchData = () => {
    setRefetch(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setRefetch(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refetch]);
  return { loading, error, data, refetchData };
};