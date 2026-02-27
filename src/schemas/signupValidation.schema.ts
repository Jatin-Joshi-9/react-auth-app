import { object, string, ref} from 'yup';

const signupSchema = object({
    name: string()
      .trim()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must not exceed 50 characters")
      .matches(/^[A-Za-z ]+$/, "Name should contain only letters"),

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
      ),
    confirmPassword: string()
      .required("Confirm password is required")
      .oneOf([ref('password')], "Passwords must match")
  });

export default signupSchema;