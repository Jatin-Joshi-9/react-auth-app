import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../services/ticket.service.ts";
import TicketCard from "../Components/TicketCard.tsx";
import { ToastContainer } from "react-toastify";

interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    agentName?: string;
    priority?: string;
}

const AllTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await getAllTickets();
            const data = await response.json();
            if (response.ok) {
                setTickets(data.data);
            } else {
                setError(data.message || "Failed to fetch tickets");
            }
        } catch (err) {
            setError("An error occurred while fetching tickets");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            <ToastContainer position="top-center" autoClose={1500} />
            <div className="w-full max-w-3xl">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Tickets</h1>
                    <button
                        className="bg-blue-200 border border-black font-bold rounded-3xl py-2 px-5 cursor-grab"
                        onClick={() => navigate("/")}>
                        Back to Home
                    </button>
                </div>

                {error && <p className="text-center text-red-500">{error}</p>}

                {!error && tickets.length === 0 && (
                    <p className="text-center text-gray-500">No tickets found.</p>
                )}

                {!error && tickets.map((ticket, index) => (
                    <TicketCard key={index} {...ticket}  onRefresh={fetchTickets}/>
                ))}

            </div>
        </div>
    );
};

export default AllTickets;