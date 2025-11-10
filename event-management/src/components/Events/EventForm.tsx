import React, { useState, useEffect } from 'react';
import { useCreateEventMutation, useUpdateEventMutation } from '../../features/Events/eventsApi';
import type { Event, CreateEvent, UpdateEvent } from '../../types/types';

interface EventFormProps {
  event?: Event | null;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: '',
  });

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (event) {
      setFormData({
        event_name: event.event_name,
        event_date: event.event_date.split('T')[0], // Format for date input
        event_location: event.event_location,
        event_description: event.event_description,
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (event) {
        // Update existing event
        const updateData: UpdateEvent = formData;
        await updateEvent({ id: event.event_id, data: updateData }).unwrap();
      } else {
        // Create new event
        const createData: CreateEvent = {
          ...formData,
          created_by: 1, // This should come from user context/auth
        };
        await createEvent(createData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="event_name" className="block text-sm font-medium text-gray-700 mb-1">
          Event Name *
        </label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter event name"
        />
      </div>

      <div>
        <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
          Event Date *
        </label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="event_location" className="block text-sm font-medium text-gray-700 mb-1">
          Location *
        </label>
        <input
          type="text"
          id="event_location"
          name="event_location"
          value={formData.event_location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter event location"
        />
      </div>

      <div>
        <label htmlFor="event_description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="event_description"
          name="event_description"
          value={formData.event_description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter event description"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;