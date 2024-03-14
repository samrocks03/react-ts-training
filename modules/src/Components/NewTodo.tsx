// Components/NewTodo.tsx
// import { FormEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../App.css";
import { useNavigate } from "react-router-dom";
// import { API_ENDPOINT } from "../constants";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { Todo } from "./Home";
import { usePostTodo } from "../Hooks/todo.hooks";

const validationRules = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
});

const NewTodo = () => {
  const navigate = useNavigate();
  const { mutate } = usePostTodo();

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

  const handleSubmit = async (values: ValuesType) => {
    const payload: Todo = {
      id: uuidv4(),
      title: values.title,
      description: values.description,
      completed: false,
      date: values.date,
    };
    try {
      await mutate(payload, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          console.error("Error adding todo:", error);
        },
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="container w-70">
      <h1>ADD Todos</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationRules}
      >
        <Form>
          <Field type="text" name="title" placeholder="Title" />
          <ErrorMessage
            className="margin margin-bro d-flex align-items-left"
            name="title"
            component="div"
          />

          <Field as="textarea" name="description" placeholder="Description" />
          <ErrorMessage
            className="margin d-flex align-items-left"
            name="description"
            component="div"
          />

          <div className="d-flex mb-3 justify-content-between">
            <div className="d-flex flex-column justify-content-start  w-30">
              <Field
                type="date"
                className="mt-4 form-control"
                id="dateField"
                name="date"
                min={getCurrentDate()}
              />
              <ErrorMessage name="date" className="text-start bg-danger" />
            </div>

            <button className="btn btn-primary mt-4" type="submit">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewTodo;
