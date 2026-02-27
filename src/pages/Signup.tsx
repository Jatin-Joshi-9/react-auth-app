import React from "react";
import { useNavigate } from "react-router-dom";
import  signupSchema  from "../schemas/signupValidation.schema.js";
import InputField from "../Components/InputField.js";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

const SignupPage = () => {
  
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      navigate("/login");
    } else {
      console.log("Signup failed");
    }
  };
  
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  
  
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h2 className="text-xl font-semibold mb-4 bg-blue-400 rounded-2xl p-3">
        Signup Form
      </h2>


       <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      <Form className="formType flex flex-col gap-1 w-80">

        <InputField label="name" type="text" name="name" />
        
        <InputField label="email" type="email" name="email" />
        
        <InputField label="password" type="password" name="password" />
        
        <InputField label="confirmPassword" type="password" name="confirmPassword" />
        
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
   
  );
};
export default SignupPage;
