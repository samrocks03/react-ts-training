// Components/NewTodo.tsx
// import { FormEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../App.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4 } from "uuid";

const NewTodo = () => {
  const navigate = useNavigate();

  type ValuesType = {
    title: string;
    description: string;
    date: string;
  };

  const initialValues: ValuesType = {
    title: "",
    description: "",
    date: "",
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (
    values: ValuesType,
    navigate: NavigateFunction
  ) => {
    try {
      await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuidv4(),
          title: values.title,
          description: values.description,
          date: values.date,
          completed: false,
        }),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>TODO's</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values, navigate)}
      >
        <Form>
          <Field type="text" name="title" placeholder="Title" required />
          <ErrorMessage 
              name="title"
              // {titleError => <p>{titleError}</p>}
              component="div" />

          <Field
            as="textarea"
            name="description"
            placeholder="Description"
            required
          />

          <ErrorMessage name="description" component="div" />

          <div className="d-flex mb-3 justify-content-end">
            <Field
              type="date"
              className="w-25 d-flex justify-content-center form-control"
              id="dateField"
              name="date"
              min={getCurrentDate()}
              required
            />

            <button className="container-button" type="submit">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewTodo;
