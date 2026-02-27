import React from 'react'
import { Form, Formik } from 'formik';
import {Link} from 'react-router-dom';
import InputField from '../Components/InputField.tsx';
import createTicketSchema from '../schemas/createTicketValidation.schema.ts';
import { useNavigate } from 'react-router-dom';

interface CreateTicketValues {
    title: string;
    description: string;
}
const CreateTicket = () => {
    const navigate = useNavigate();
    const initialValues: CreateTicketValues = {
        title: "",
        description: ""
    };

    const handleSubmit = async (values: CreateTicketValues) => {
        console.log(import.meta.env.VITE_TICKETS_API_URL);
        try {
            const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                console.log("Ticket created successfully");
                const data = await response.json();
                console.log("Response data:", data);
            } else {
                const data = await response.json();
                console.error("Failed to create ticket:", data);
            }
        }
        catch (error) {
            console.error("Error creating ticket:", error);
        }
  }
  const handleClose = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className='text-2xl font-bold text-center mt-10'>Ticket Form</h1>
      
      <Formik className="formType flex flex-col gap-1"
      initialValues={initialValues}
        validationSchema={createTicketSchema}
        onSubmit={handleSubmit}>

        <Form className="formType flex flex-col gap-1 w-80">

            <InputField label="Title" name="title" type="text" />
            
            <InputField label="Description" name="description" type="text" />

          <button
            className="bg-blue-200 border-b-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="submit">
            Submit
          </button>

          <button className="bg-red-200 border-black border text-1xl font-bold rounded-3xl my-1.5 py-2 cursor-grab"
            type="button"
            onClick={handleClose}>
            Close
          </button>
        </Form>
      </Formik>
    </div>
  )
}


export default CreateTicket