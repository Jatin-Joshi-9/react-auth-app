import { object, string } from "yup";

const loginSchema = object({
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
        )
});

export default loginSchema;