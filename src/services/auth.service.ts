interface LoginValues {
    email: string;
    password: string;
}

interface SignupValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const loginUser = async (values: LoginValues): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    return response;
};

export const registerUser = async (values: SignupValues): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
    return response;
};