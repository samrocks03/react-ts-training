// Components/NewTodo.tsx
// import { FormEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "../App.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

const validationRules = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  date: yup.date().required("Date is required"),
});

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
      <h1>ADD Todos</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values, navigate)}
        validationSchema={validationRules}
      >
        <Form>
          <Field type="text" name="title" placeholder="Title"  />
          <ErrorMessage name="title" component="div" />

          <Field
            as="textarea"
            name="description"
            placeholder="Description"
            
          />


          <ErrorMessage name="description" component="div" />

          <div className="d-flex mb-3 justify-content-end">
            <Field
              type="date"
              className="w-25 d-flex justify-content-center form-control"
              id="dateField"
              name="date"
              min={getCurrentDate()}
              
              />

          <ErrorMessage name="date" component="div" />

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


/**
 * 
 * 1. redirect link for "Title"
 * 2. Remove the dark blue color
 * 3. Refactor the Add todos page such that
 *    - the error messsage must appear exactly below the input field and towards left side (aligned)
 *    - Adjust date and add button (space-between property)
 * 4. 
 */