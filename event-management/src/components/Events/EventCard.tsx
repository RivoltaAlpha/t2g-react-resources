import React from 'react';
import { useGetRegistrationsByEventQuery } from '../../features/Registrations/registrationsApi';
import { useGetFeedbacksByEventQuery } from '../../features/Feedbacks/feedbacksApi';
import type { Event } from '../../types/types';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const { data: registrations } = useGetRegistrationsByEventQuery(event.event_id);
  const { data: feedbacks } = useGetFeedbacksByEventQuery(event.event_id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const averageRating = feedbacks && feedbacks.length > 0
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {event.event_name}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(event)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDate(event.event_date)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.event_location}</span>
          </div>

          <p className="text-gray-700 text-sm line-clamp-3">
            {event.event_description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {registrations?.length || 0}
                </div>
                <div className="text-xs text-gray-500">Registrations</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  {averageRating}
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">
                  {feedbacks?.length || 0}
                </div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;