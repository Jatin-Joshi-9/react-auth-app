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

export const getAllTickets = async (): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response;
};

export const getComments = async (ticketId: string): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}/${ticketId}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response;
};

export const addComment = async (ticketId: string, body: string): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}/${ticketId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ body })
    });
    return response;
};

export const updateTicket = async (ticketId: string, body: object): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_TICKETS_API_URL}/${ticketId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
    });
    return response;
};