import React, { useState, useEffect } from 'react';
import { useCreateRegistrationMutation, useUpdateRegistrationMutation } from '../../features/Registrations/registrationsApi';
import { useGetEventsQuery } from '../../features/Events/eventsApi';
import { useGetUsersQuery } from '../../features/Users/usersApi';
import type { Registration, CreateRegistration, UpdateRegistration } from '../../types/types';

interface RegistrationFormProps {
  registration?: Registration | null;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ registration, onClose }) => {
  const [formData, setFormData] = useState({
    registration_date: '',
    payment_status: 'pending' as 'pending' | 'completed' | 'failed',
    payment_amount: '',
    event_id: '',
    user_id: '',
  });

  const { data: events } = useGetEventsQuery();
  const { data: users } = useGetUsersQuery();
  const [createRegistration, { isLoading: isCreating }] = useCreateRegistrationMutation();
  const [updateRegistration, { isLoading: isUpdating }] = useUpdateRegistrationMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (registration) {
      setFormData({
        registration_date: registration.registration_date.split('T')[0],
        payment_status: registration.payment_status,
        payment_amount: registration.payment_amount.toString(),
        event_id: registration.event_id.toString(),
        user_id: registration.user_id.toString(),
      });
    } else {
      // Set default registration date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, registration_date: today }));
    }
  }, [registration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (registration) {
        // Update existing registration
        const updateData: UpdateRegistration = {
          registration_date: formData.registration_date,
          payment_status: formData.payment_status,
          payment_amount: parseFloat(formData.payment_amount),
        };
        await updateRegistration({ id: registration.registration_id, data: updateData }).unwrap();
      } else {
        // Create new registration
        const createData: CreateRegistration = {
          registration_date: formData.registration_date,
          payment_status: formData.payment_status,
          payment_amount: parseFloat(formData.payment_amount),
          event_id: parseInt(formData.event_id),
          user_id: parseInt(formData.user_id),
        };
        await createRegistration(createData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save registration:', error);
    }
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
            disabled={!!registration} // Disable if editing
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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
            disabled={!!registration} // Disable if editing
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="registration_date" className="block text-sm font-medium text-gray-700 mb-1">
            Registration Date *
          </label>
          <input
            type="date"
            id="registration_date"
            name="registration_date"
            value={formData.registration_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="payment_amount" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount *
          </label>
          <input
            type="number"
            id="payment_amount"
            name="payment_amount"
            value={formData.payment_amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="payment_status" className="block text-sm font-medium text-gray-700 mb-1">
          Payment Status *
        </label>
        <select
          id="payment_status"
          name="payment_status"
          value={formData.payment_status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
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
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : registration ? 'Update Registration' : 'Create Registration'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;