import { useEffect } from 'react'
import { Form, Formik } from 'formik';
import InputField from '../Components/InputField.tsx';
import { useNavigate } from 'react-router-dom';
import createTicketValidate from '../validations/createTicket.validation.ts';
import { ToastContainer, toast } from 'react-toastify';
import { createTicket } from '../services/ticket.service.ts';
interface CreateTicketValues {
  title: string;
  description: string;
}
const CreateTicket = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);


  const initialValues: CreateTicketValues = {
    title: "",
    description: ""
  };

  const handleSubmit = async (values: CreateTicketValues) => {
    try {
      const response = await createTicket(values);

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        toast.success("Ticket created successfully!");
      } else {
        const data = await response.json();
        console.error("Failed to create ticket:", data);
      }
    }
    catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("An error occurred while creating the ticket");
    }
  }
  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center">
        <ToastContainer position="top-center" autoClose={1500} />
      <h1 className='text-2xl font-bold text-center mt-10'>Ticket Form</h1>

      <Formik className="formType flex flex-col gap-1"
        initialValues={initialValues}
        validate={createTicketValidate}
        onSubmit={handleSubmit}>

        <Form className="formType flex flex-col gap-1 w-80">

          <InputField label="Title" name="title" type="text" />

          <InputField label="Description" name="description" type="text" textarea={true} rows={4} />

          <button
            className="bg-blue-200 border-b-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="submit">
            Submit
          </button>

          <button className=" border-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="button"
            onClick={handleBack}>
            Back to Home
          </button>
        </Form>
      </Formik>
    </div>
  )
}


export default CreateTicket