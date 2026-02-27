import {object, string} from 'yup';

const createTicketSchema = object({
    title: string()
        .required("Title is required")
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title must not exceed 100 characters"),

    description: string()
        .required("Description is required")
        .trim()
        .min(10, "Description must be at least 10 characters long")
        .required("Description is required")
        .max(1000, "Description must not exceed 1000 characters")
});

export default createTicketSchema;