import { Formik, Form, Field } from 'formik'
import React from 'react'

export const Signup = () => {
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
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }
        }>

        <Form className="formType flex flex-col gap-1">
          <label htmlFor="name" className="label font-bold self-start">Name</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="name"
            type="text"

          />

          <label htmlFor="email" className="label font-bold self-start">Email</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="email"
            type="email"

          />

          <label htmlFor="password" className="label font-bold self-start">Password</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="password"
            type="password"

          />

          <label htmlFor="confirmPassword" className="label font-bold self-start">Confirm Password</label>
          <Field className="input border-2 border-blue-400 rounded-xl py-1 px-4"
            name="confirmPassword"
            type="password"
          />

          <button
            className="bg-blue-200 border-b-black border text-1xl font-bold rounded-3xl my-1.5 py-2"
            type="submit">
            Submit
          </button>
        </Form>

      </Formik>
    </div>

  )
}
