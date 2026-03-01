interface TicketCardProps {
    title: string;
    description: string;
    status: string;
    createdAt: string;
    agentName?: string;
    priority?: string;
}

const TicketCard = ({ title, description, status, createdAt, agentName, priority }: TicketCardProps) => {
    const date = new Date(createdAt);

    return (
        <div className="border-2 border-blue-300 rounded-2xl p-4 mb-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{title}</h2>
                <span className="text-sm font-semibold px-3 py-1 rounded-full">
                    {status}
                </span>
            </div>

            <p className="text-gray-600 text-sm">{description}</p>

            <div className="flex justify-between text-xs text-black mt-1">
                <span>Created: {date.toLocaleDateString()}</span>
                {agentName && <span>Agent: {agentName}</span>}
                {priority && <span>Priority: {priority}</span>}
            </div>
        </div>
    );
};

export default TicketCard;