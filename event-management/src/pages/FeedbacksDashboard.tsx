import React, { useState } from 'react';
import { useGetFeedbacksQuery, useDeleteFeedbackMutation } from '../features/Feedbacks/feedbacksApi';
import { useGetEventsQuery } from '../features/Events/eventsApi';
import { useGetUsersQuery } from '../features/Users/usersApi';
import FeedbackCard from '../components/Feedbacks/FeedbackCard';
import FeedbackForm from '../components/Feedbacks/FeedbackForm';
import Modal from '../components/UI/Modal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import type { Feedback } from '../types/types';

const FeedbacksDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  const { data: feedbacks, isLoading } = useGetFeedbacksQuery();
  const { data: events } = useGetEventsQuery();
  const { data: users } = useGetUsersQuery();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const handleEdit = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleDelete = async (feedbackId: number) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteFeedback(feedbackId).unwrap();
      } catch (error) {
        console.error('Failed to delete feedback:', error);
      }
    }
  };

  const handleCreate = () => {
    setSelectedFeedback(null);
    setIsModalOpen(true);
  };

  const filteredFeedbacks = feedbacks?.filter(feedback => {
    if (ratingFilter === 'all') return true;
    const rating = parseInt(ratingFilter);
    return feedback.rating === rating;
  }) || [];

  const getEventName = (eventId: number) => {
    return events?.find(e => e.event_id === eventId)?.event_name || 'Unknown Event';
  };

  const getUserName = (userId: number) => {
    return users?.find(u => u.user_id === userId)?.name || 'Anonymous';
  };

  // Calculate stats
  const averageRating = feedbacks && feedbacks.length > 0
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  const ratingDistribution = {
    5: feedbacks?.filter(f => f.rating === 5).length || 0,
    4: feedbacks?.filter(f => f.rating === 4).length || 0,
    3: feedbacks?.filter(f => f.rating === 3).length || 0,
    2: feedbacks?.filter(f => f.rating === 2).length || 0,
    1: feedbacks?.filter(f => f.rating === 1).length || 0,
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Feedback Dashboard</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Add Feedback
        </button>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              ratingFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setRatingFilter(rating.toString())}
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-1 ${
                ratingFilter === rating.toString()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span>{rating}</span>
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-indigo-600">{feedbacks?.length || 0}</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600 flex items-center">
            {averageRating}
            <svg className="w-5 h-5 ml-1 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-gray-600">{ratingDistribution[rating as keyof typeof ratingDistribution]}</div>
            <div className="text-sm text-gray-600 flex items-center">
              {rating}
              <svg className="w-3 h-3 ml-1 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Stars
            </div>
          </div>
        ))}
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.feedback_id}
            feedback={feedback}
            eventName={getEventName(feedback.event_id)}
            userName={getUserName(feedback.user_id)}
            onEdit={handleEdit}
            onDelete={() => handleDelete(feedback.feedback_id)}
          />
        ))}
      </div>

      {filteredFeedbacks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No feedback found.</div>
        </div>
      )}

      {/* Feedback Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedFeedback ? 'Edit Feedback' : 'Add New Feedback'}
      >
        <FeedbackForm
          feedback={selectedFeedback}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FeedbacksDashboard;