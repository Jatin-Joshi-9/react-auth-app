interface LoginValues {
    email: string;
    password: string;
}

interface LoginErrors {
    email?: string;
    password?: string;
}
const loginValidate = (values: LoginValues): LoginErrors => {
    const errors: LoginErrors = {};

    const email = values.email.trim();
    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = "Email must be a valid email address";
    } else if (email.length > 100) {
        errors.email = "Email must not exceed 100 characters";
    }

    const password = values.password;
    if (!password) {
        errors.password = "Password is required";
    }
    return errors;
};

export default loginValidate;