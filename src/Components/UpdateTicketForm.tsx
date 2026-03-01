import { useState } from "react";
import { updateTicket } from "../services/ticket.service.ts";
import { toast } from "react-toastify";

interface UpdateTicketFormProps {
    ticketId: string;
    currentStatus: string;
    currentDescription: string;
    currentPriority?: string;
    onUpdateSuccess: () => void;
}

const UpdateTicketForm = ({ ticketId, currentStatus, currentDescription, currentPriority, onUpdateSuccess }: UpdateTicketFormProps) => {
    const role = localStorage.getItem("role");
    const [description, setDescription] = useState<string>(currentDescription);
    const [status, setStatus] = useState<string>(currentStatus);
    const [priority, setPriority] = useState<string>(currentPriority || "MEDIUM");
    const [error, setError] = useState<string>("");

    const handleUpdate = async () => {
        setError("");
        try {
            const body: Record<string, string> = {};

            if (role === "CUSTOMER") {
                if (description !== currentDescription) body.description = description;
                if (status !== currentStatus) body.status = status;
            }

            if (role === "SUPPORT_AGENT") {
                if (status !== currentStatus) body.status = status;
                if (priority !== currentPriority) body.priority = priority;
            }

            if (Object.keys(body).length === 0) {
                setError("No changes made");
                return;
            }

            const response = await updateTicket(ticketId, body);
            const data = await response.json();

            if (response.ok) {
                toast.success("Ticket updated successfully!");
                onUpdateSuccess();
            } else {
                setError(data.message || "Failed to update ticket");
            }
        } catch (err) {
            setError("An error occurred while updating ticket");
        }
    };

    return (
        <div className="mt-3 border-t border-blue-100 pt-3 flex flex-col gap-3">

            {role === "CUSTOMER" && (
                <>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">Description</label>
                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="border-2 border-blue-300 rounded-xl px-3 py-1 text-sm "
                            rows={3}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">Status</label>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="border-2 border-blue-300 rounded-xl px-3 py-1 text-sm">
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>
                </>
            )}

            {role === "SUPPORT_AGENT" && (
                <>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">Status</label>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="border-2 border-blue-300 rounded-xl px-3 py-1 text-sm">
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">Priority</label>
                        <select
                            value={priority}
                            onChange={(event) => setPriority(event.target.value)}
                            className="border-2 border-blue-300 rounded-xl px-3 py-1 text-sm">
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                </>
            )}

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <button
                onClick={handleUpdate}
                className="bg-blue-200 border border-black text-sm font-bold rounded-xl px-3 py-1 cursor-pointer self-end">
                Save Changes
            </button>
        </div>
    );
};

export default UpdateTicketForm;