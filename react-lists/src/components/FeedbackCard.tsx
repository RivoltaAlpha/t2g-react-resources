import { Star } from "lucide-react";

interface FeedbackCardProps {
    feedback: {
        feedback_id: number;
        rating: number;
        comments: string;
        created_at: string;
    };
    username: string;
    eventname: string;
}

export const FeedbackCard = ({ feedback, username, eventname}: FeedbackCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-ld transition-shadow">
            <div>
                <div>
                    <h4 className="font-semibold text-gray-800">{username}</h4>
                    <p className="text-sm text-gray-500">{eventname}</p>
                </div>
                <div className="flex items-center space-x-1">
                    {/* Star Rating - assuming a 5-star system */}
                    {[...Array(5)].map((_, index) => (
                        <Star
                        key={index}
                        className={`w-4 h-4 ${
                            index < feedback.rating ? 'text-yellow-400 fill-current': 'text-gray-300'
                        }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};