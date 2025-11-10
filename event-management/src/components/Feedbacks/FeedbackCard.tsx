import React from 'react';
import type { Feedback } from '../../types/types';

interface FeedbackCardProps {
  feedback: Feedback;
  eventName: string;
  userName: string;
  onEdit: (feedback: Feedback) => void;
  onDelete: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  eventName,
  userName,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Feedback #{feedback.feedback_id}
              </h3>
              <div className="flex items-center space-x-1">
                {renderStars(feedback.rating)}
                <span className={`ml-2 text-lg font-semibold ${getRatingColor(feedback.rating)}`}>
                  {feedback.rating}/5
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Event</label>
              <p className="text-gray-900 font-medium">{eventName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Reviewer</label>
              <p className="text-gray-900">{userName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="text-gray-900">{formatDate(feedback.created_at)}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500">Comments</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">
                {feedback.comments || 'No comments provided.'}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Created: {formatDate(feedback.created_at)} | 
            Updated: {formatDate(feedback.updated_at)}
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(feedback)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded border border-blue-200 hover:bg-blue-50"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;