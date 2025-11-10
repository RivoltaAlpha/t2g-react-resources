import React, { useState, useEffect } from 'react';
import { useCreateFeedbackMutation, useUpdateFeedbackMutation } from '../../features/Feedbacks/feedbacksApi';
import { useGetEventsQuery } from '../../features/Events/eventsApi';
import { useGetUsersQuery } from '../../features/Users/usersApi';
import type { Feedback, CreateFeedback, UpdateFeedback } from '../../types/types';

interface FeedbackFormProps {
  feedback?: Feedback | null;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedback, onClose }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    comments: '',
    event_id: '',
    user_id: '',
  });

  const { data: events } = useGetEventsQuery();
  const { data: users } = useGetUsersQuery();
  const [createFeedback, { isLoading: isCreating }] = useCreateFeedbackMutation();
  const [updateFeedback, { isLoading: isUpdating }] = useUpdateFeedbackMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (feedback) {
      setFormData({
        rating: feedback.rating,
        comments: feedback.comments,
        event_id: feedback.event_id.toString(),
        user_id: feedback.user_id.toString(),
      });
    }
  }, [feedback]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'rating' ? parseInt(value) : value 
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (feedback) {
        // Update existing feedback
        const updateData: UpdateFeedback = {
          rating: formData.rating,
          comments: formData.comments,
        };
        await updateFeedback({ id: feedback.feedback_id, data: updateData }).unwrap();
      } else {
        // Create new feedback
        const createData: CreateFeedback = {
          rating: formData.rating,
          comments: formData.comments,
          event_id: parseInt(formData.event_id),
          user_id: parseInt(formData.user_id),
        };
        await createFeedback(createData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save feedback:', error);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(index + 1)}
            className={`w-8 h-8 ${
              index < formData.rating 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            } transition-colors`}
          >
            <svg className="w-full h-full fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">({formData.rating}/5)</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="event_id" className="block text-sm font-medium text-gray-700 mb-1">
            Event *
          </label>
          <select
            id="event_id"
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
            required
            disabled={!!feedback} // Disable if editing
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Select an event</option>
            {events?.map((event) => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">
            User *
          </label>
          <select
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            disabled={!!feedback} // Disable if editing
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Select a user</option>
            {users?.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        {renderStarRating()}
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Share your thoughts about the event..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : feedback ? 'Update Feedback' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;