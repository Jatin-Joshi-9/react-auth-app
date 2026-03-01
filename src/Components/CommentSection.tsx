import { useEffect, useState } from "react";
import { getComments, addComment } from "../services/ticket.service.ts";

interface Comment {
    comment: string;
    commenter: string;
    createdAt: string;
}

interface CommentSectionProps {
    ticketId: string;
}

const CommentSection = ({ ticketId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await getComments(ticketId);
            const data = await response.json();
            if (response.ok) {
                setComments(data.data);
                console.log("Fetched comments:", data.data);
            } else {
                setError(data.message || "Failed to fetch comments");
            }
        } catch (error: any) {
            setError("An error occurred while fetching comments: " + error.message);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await addComment(ticketId, newComment);
            const data = await response.json();
            if (response.ok) {
                setNewComment("");
                fetchComments();  
            } else {
                setError(data.message || "Failed to add comment");
            }
        } catch (error: any) {
            setError("An error occurred while adding comment: " + error.message);
        }
    };

    return (
        <div className="mt-3 pt-3 flex flex-col gap-2">

            {comments.length === 0 && (
                <p className="text-xs text-gray-400 text-center">No comments yet.</p>
            )}
            {comments.map((currentComment, index) => (

                <div key={index} className="bg-gray-50 rounded-xl px-3 py-2">
                    <p className="text-sm text-gray-700">{currentComment.comment}</p>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{currentComment.commenter}</span>
                        <span>{new Date(currentComment.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

            ))}

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <div className="flex gap-2 mt-1">
                <input
                    type="text"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    className="flex-1 border-2 border-blue-300 rounded-xl px-3 py-1 text-sm"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-blue-200 border border-black text-sm font-bold rounded-xl px-3 py-1 cursor-pointer">
                    Add Comment
                </button>
            </div>
        </div>
    );
};

export default CommentSection;