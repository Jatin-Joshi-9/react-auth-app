import { useNavigate, Link } from "react-router-dom";
import signupSchema from "../schemas/signupValidation.schema.ts";
import InputField from "../Components/InputField.tsx";
import { Formik, Form } from "formik";

const SignupPage=() => {

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Signup successful");
        const data = await response.json();
        console.log("Response data:", data);
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h2 className="text-xl font-semibold mb-4 bg-blue-200 rounded-2xl p-3">
        Signup Form
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-1 w-80">

          <InputField label="Name" type="text" name="name" />
          <InputField label="Email" type="email" name="email" />
          <InputField label="Password" type="password" name="password" />
          <InputField label="Confirm Password" type="password" name="confirmPassword" />
          
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