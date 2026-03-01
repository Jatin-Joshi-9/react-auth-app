interface SignupValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface SignupErrors {
  email?: string;
  name?: string;
  confirmPassword?: string;
  password?: string;
}
const signupValidate = (values: SignupValues): SignupErrors => {
    const errors: SignupErrors = {};

    const name = values.name;
    if (!name) {
      errors.name = "Name is required";
    } else if (name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else if (name.trim().length > 50) {
      errors.name = "Name must not exceed 50 characters";
    } else if (!/^[A-Za-z ]+$/.test(name.trim())) {
      errors.name = "Name should contain only letters";
    }

    const email = values.email;
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
      errors.email = "Email must be a valid email address";
    } else if (email.trim().length > 100) {
      errors.email = "Email must not exceed 100 characters";
    }

    const password = values.password;
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (password.length > 16) {
      errors.password = "Password must not exceed 16 characters";
    } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/.test(password)) {
      errors.password = "Password must include uppercase, lowercase, number & special character";
    }

    const confirmPassword = values.confirmPassword;
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords must match";
    }

  return errors;
}

export default signupValidate;