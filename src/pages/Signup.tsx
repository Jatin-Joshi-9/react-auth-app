import { useNavigate, Link } from "react-router-dom";
import InputField from "../Components/InputField.tsx";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import signupValidate from "../validations/signup.validation.ts";
import { registerUser } from "../services/auth.service.ts";

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const initialValues: SignupValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SignupValues) => {
    try {
      const response = await registerUser(values);
      if (response.ok) {
        toast.success("Account created! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Signup failed");
      }
    }
    catch (error) {
      toast.error("An error occurred during signup");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <ToastContainer position="top-center" autoClose={1500} />

      <h2 className="text-xl font-semibold mb-4 bg-blue-200 rounded-2xl p-3">
        Signup Form
      </h2>

      <Formik
        initialValues={initialValues}
        validate={signupValidate}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80">

          <InputField label="Name" type="text" name="name" />
          <InputField label="Email" type="email" name="email" />
          <InputField label="Password" type="password" name="password" />
          <InputField label="Confirm Password" type="password" name="confirmPassword" />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            className="bg-blue-200 border-b-black border text-xl font-bold rounded-3xl my-1.5 py-2 cursor-pointer"
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