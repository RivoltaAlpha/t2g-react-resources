import React from 'react';
import { useGetEventsQuery } from '../features/Events/eventsApi';
import { useGetRegistrationsQuery } from '../features/Registrations/registrationsApi';
import { useGetPaymentsQuery } from '../features/Payments/paymentsApi';
import { useGetFeedbacksQuery } from '../features/Feedbacks/feedbacksApi';
import { useGetUsersQuery } from '../features/Users/usersApi';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { data: events, isLoading: eventsLoading } = useGetEventsQuery();
  const { data: registrations, isLoading: registrationsLoading } = useGetRegistrationsQuery();
  const { data: payments, isLoading: paymentsLoading } = useGetPaymentsQuery();
  const { data: feedbacks, isLoading: feedbacksLoading } = useGetFeedbacksQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  const isLoading = eventsLoading || registrationsLoading || paymentsLoading || feedbacksLoading || usersLoading;

  // Calculate statistics
  const totalRevenue = payments?.filter(p => p.payment_status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0) || 0;

  const pendingRevenue = payments?.filter(p => p.payment_status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0) || 0;

  const averageRating = feedbacks && feedbacks.length > 0
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  const upcomingEvents = events?.filter(event => new Date(event.event_date) > new Date()).length || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getRecentEvents = () => {
    return events?.slice(0, 5) || [];
  };

  const getRecentRegistrations = () => {
    return registrations?.slice(0, 5) || [];
  };

  const getEventName = (eventId: number) => {
    return events?.find(e => e.event_id === eventId)?.event_name || 'Unknown Event';
  };

  const getUserName = (userId: number) => {
    return users?.find(u => u.user_id === userId)?.name || 'Unknown User';
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Management Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your event management system overview</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Events</p>
              <p className="text-3xl font-bold">{events?.length || 0}</p>
              <p className="text-blue-100 text-sm">{upcomingEvents} upcoming</p>
            </div>
            <div className="text-blue-200">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Registrations</p>
              <p className="text-3xl font-bold">{registrations?.length || 0}</p>
              <p className="text-green-100 text-sm">
                {registrations?.filter(r => r.payment_status === 'completed').length || 0} confirmed
              </p>
            </div>
            <div className="text-green-200">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
              <p className="text-purple-100 text-sm">{formatCurrency(pendingRevenue)} pending</p>
            </div>
            <div className="text-purple-200">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Average Rating</p>
              <p className="text-3xl font-bold flex items-center">
                {averageRating}
                <svg className="w-6 h-6 ml-1 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </p>
              <p className="text-yellow-100 text-sm">{feedbacks?.length || 0} reviews</p>
            </div>
            <div className="text-yellow-200">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h2>
          <div className="space-y-3">
            {getRecentEvents().map((event) => (
              <div key={event.event_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{event.event_name}</h3>
                  <p className="text-sm text-gray-600">{event.event_location}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {registrations?.filter(r => r.event_id === event.event_id).length || 0} registrations
                  </div>
                </div>
              </div>
            ))}
            {getRecentEvents().length === 0 && (
              <p className="text-gray-500 text-center py-4">No events found</p>
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Registrations</h2>
          <div className="space-y-3">
            {getRecentRegistrations().map((registration) => (
              <div key={registration.registration_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{getEventName(registration.event_id)}</h3>
                  <p className="text-sm text-gray-600">{getUserName(registration.user_id)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(registration.registration_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    registration.payment_status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : registration.payment_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {registration.payment_status}
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatCurrency(registration.payment_amount)}
                  </div>
                </div>
              </div>
            ))}
            {getRecentRegistrations().length === 0 && (
              <p className="text-gray-500 text-center py-4">No registrations found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;