import { useState } from "react";
import CommentSection from "./CommentSection.tsx";
import UpdateTicketForm from "./UpdateTicketForm.tsx";

interface TicketCardProps {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    agentName?: string;
    priority?: string;
    onRefresh: () => void;
}

const TicketCard = ({ id, title, description, status, createdAt, agentName, priority, onRefresh }: TicketCardProps) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const date = new Date(createdAt);

    const handleUpdateSuccess = () => {
        setShowUpdate(false);
        onRefresh();
    };

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

            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-xs text-blue-500 border border-blue-500 rounded-full px-2 py-1">
                    {showComments ? "Hide Comments" : "View Comments"}
                </button>

                {status !== "CLOSED" && (
                    <button
                        onClick={() => setShowUpdate(!showUpdate)}
                        className="text-xs text-green-600 border border-green-600 rounded-full px-2 py-1">
                        {showUpdate ? "Cancel Update" : "Update Ticket"}
                    </button>
                )}
            </div>

            {showUpdate && (
                <UpdateTicketForm
                    ticketId={id}
                    currentStatus={status}
                    currentDescription={description}
                    currentPriority={priority || ""}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {showComments && <CommentSection ticketId={id} />}
        </div>
    );
};

export default TicketCard;