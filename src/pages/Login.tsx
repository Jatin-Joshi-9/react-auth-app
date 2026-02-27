import { Formik, Form } from 'formik'
import loginSchema from '../schemas/loginValiadtion.schema.ts'; 
import InputField from '../Components/InputField.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

interface LoginValues {
  email: string;
  password: string;
}
const Login = () => {
    const navigate = useNavigate();

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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();
    console.log(data);
    if (data.data && data.data.token) {
      localStorage.setItem("token", data.data.token);
    }
    console.log(localStorage.getItem("token"));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center border-2 border-black">
      <h2 className="text-xl font-semibold mb-4 bg-blue-200 rounded-2xl p-3">
        Login Form
      </h2>

      <Formik className="formType flex flex-col gap-1"
      initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}>

        <Form className="formType flex flex-col gap-1 w-80">

            <InputField label="Email" name="email" type="email" />
            
            <InputField label="Password" name="password" type="password"/>

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
  )
}
export default Login

