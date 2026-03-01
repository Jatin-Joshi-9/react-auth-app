interface CreateTicketValues {
    title: string;
    description: string;
}

export const createTicket = async (values: CreateTicketValues): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(values)
    });
    return response;
};