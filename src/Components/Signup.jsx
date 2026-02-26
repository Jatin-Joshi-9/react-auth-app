import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import { object, ref, string } from 'yup';
import { Link } from 'react-router-dom';
export const Signup = () => {
  const schema = object({
    name: string()
      .trim()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must not exceed 50 characters")
      .matches(/^[A-Za-z ]+$/, "Name should contain only letters"),

    email: string()
      .trim()
      .required("Email is required")
      .email("Email must be a valid email address")
      .max(100, "Email must not exceed 100 characters"),

    password: string()
      .required("Password is required")
      .min(8, "Password must be between 8 and 16 characters long")
      .max(16, "Password must be between 8 and 16 characters long")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
        "Password must include uppercase, lowercase, number & special character"
      ),
    confirmPassword: string()
      .required("Confirm password is required")
      .oneOf([ref('password'), null], "Passwords must match")
  });

  const handleSubmit = async (values) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    alert(data.message);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h2 className="text-xl font-semibold mb-4 bg-blue-400 rounded-2xl p-3">
        Signup Form
      </h2>

      <Formik initialValues={
        {
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}>
        <Form className="formType flex flex-col gap-1">
          <label htmlFor="name" className="label font-bold self-start">Name</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="name"
            type="text"

          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

          <label htmlFor="email" className="label font-bold self-start">Email</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="email"
            type="email"

          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <label htmlFor="password" className="label font-bold self-start">Password</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="password"
            type="password"

          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <label htmlFor="confirmPassword" className="label font-bold self-start">Confirm Password</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="confirmPassword"
            type="password"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

          <button
            className="bg-blue-200 border-b-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="submit">
            Submit
          </button>

          <p className="text-sm sm:text-base text-center text-neutral-500 mt-6">
                    Already have an account?{" "}
                <Link to="/login" className="text-sky-800 font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </Form>

      </Formik>
    </div>

  )
}
