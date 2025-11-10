import React, { useState } from 'react';
import { useGetRegistrationsQuery, useDeleteRegistrationMutation } from '../features/Registrations/registrationsApi';
import { useGetEventsQuery } from '../features/Events/eventsApi';
import { useGetUsersQuery } from '../features/Users/usersApi';
import RegistrationCard from '../components/Registrations/RegistrationCard';
import RegistrationForm from '../components/Registrations/RegistrationForm';
import Modal from '../components/UI/Modal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import type { Registration } from '../types/types';

const RegistrationsDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: registrations, isLoading: registrationsLoading } = useGetRegistrationsQuery();
  const { data: events } = useGetEventsQuery();
  const { data: users } = useGetUsersQuery();
  const [deleteRegistration] = useDeleteRegistrationMutation();

  const handleEdit = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleDelete = async (registrationId: number) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteRegistration(registrationId).unwrap();
      } catch (error) {
        console.error('Failed to delete registration:', error);
      }
    }
  };

  const handleCreate = () => {
    setSelectedRegistration(null);
    setIsModalOpen(true);
  };

  const filteredRegistrations = registrations?.filter(registration => {
    if (statusFilter === 'all') return true;
    return registration.payment_status === statusFilter;
  }) || [];

  const getEventName = (eventId: number) => {
    return events?.find(e => e.event_id === eventId)?.event_name || 'Unknown Event';
  };

  const getUserName = (userId: number) => {
    return users?.find(u => u.user_id === userId)?.name || 'Unknown User';
  };

  if (registrationsLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Registrations Dashboard</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          New Registration
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === 'failed'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Failed
          </button>
        </div>
      </div>

      {/* Registration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{registrations?.length || 0}</div>
          <div className="text-sm text-gray-600">Total Registrations</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600">
            {registrations?.filter(r => r.payment_status === 'pending').length || 0}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {registrations?.filter(r => r.payment_status === 'completed').length || 0}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-red-600">
            {registrations?.filter(r => r.payment_status === 'failed').length || 0}
          </div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
      </div>

      {/* Registrations List */}
      <div className="space-y-4">
        {filteredRegistrations.map((registration) => (
          <RegistrationCard
            key={registration.registration_id}
            registration={registration}
            eventName={getEventName(registration.event_id)}
            userName={getUserName(registration.user_id)}
            onEdit={handleEdit}
            onDelete={() => handleDelete(registration.registration_id)}
          />
        ))}
      </div>

      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No registrations found.</div>
        </div>
      )}

      {/* Registration Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRegistration ? 'Edit Registration' : 'New Registration'}
      >
        <RegistrationForm
          registration={selectedRegistration}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default RegistrationsDashboard;