import { Formik, Form } from 'formik'
import InputField from '../Components/InputField.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import loginValidate from '../validations/login.validation.ts';
import { loginUser } from '../services/auth.service.ts';


interface LoginValues {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const initialValues: LoginValues = {
    email: "",
    password: ""
  };



  const handleSubmit = async (values: LoginValues) => {
    setError("");
    try {
      const response = await loginUser(values);
      const data = await response.json();
      console.log(data);


      if (data.data && data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role);
        console.log(localStorage.getItem("token"));
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      }
      else {
        setError(data.message || "Login failed");
      }
    }
    catch (error: any) {
      toast.error(`Error during login: ${error.message || error}`);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center border-2 border-black">
      <ToastContainer position="top-center" autoClose={1500} />
      <h2 className="text-xl font-semibold mb-4 bg-blue-200 rounded-2xl p-3">
        Login Form
      </h2>

      <Formik
        initialValues={initialValues}
        validate={loginValidate}
        onSubmit={handleSubmit}
      >
        <Form className="formType flex flex-col gap-1 w-80">
          <InputField label="Email" name="email" type="email" />
          <InputField label="Password" name="password" type="password" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="bg-blue-200 border-b-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="submit">
            Submit
          </button>

          <p className="text-sm sm:text-base text-center text-neutral-500 mt-6">
            Dont have an account?{" "}
            <Link to="/signup" className="text-sky-800 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;