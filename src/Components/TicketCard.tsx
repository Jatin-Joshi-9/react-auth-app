import { useState } from "react";
import CommentSection from "./CommentSection.tsx";

interface TicketCardProps {
    id: string;          
    title: string;
    description: string;
    status: string;
    createdAt: string;
    agentName?: string;
    priority?: string;
}

const TicketCard = ({ id, title, description, status, createdAt, agentName, priority }: TicketCardProps) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const date = new Date(createdAt);

    return (
        <div className="border-2 border-blue-300 rounded-2xl p-4 mb-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{title}</h2>
                <h3 className="text-sm font-semibold px-3 py-1 rounded-full">
                    {status}
                </h3>
            </div>

            <p className="text-gray-600 text-sm">{description}</p>

            <div className="flex justify-between text-xs text-black mt-1">
                <h4>Created: {date.toLocaleDateString()}</h4>
                {agentName && <span>Agent: {agentName}</span>}
                {priority && <span>Priority: {priority}</span>}
            </div>

            <button
                onClick={() => setShowComments(!showComments)}
                className="text-xs text-blue-500 border border-blue-500 rounded-full px-2 py-1 self-center mt-1">
                {showComments ? "Hide Comments" : "View Comments"}
            </button>

            {showComments && <CommentSection ticketId={id} />}
        </div>
    );
};

export default TicketCard;