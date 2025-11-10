import React from 'react';
import type { Registration } from '../../types/types';

interface RegistrationCardProps {
  registration: Registration;
  eventName: string;
  userName: string;
  onEdit: (registration: Registration) => void;
  onDelete: () => void;
}

const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
  eventName,
  userName,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Registration #{registration.registration_id}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                registration.payment_status
              )}`}
            >
              {registration.payment_status.charAt(0).toUpperCase() + registration.payment_status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Event</label>
              <p className="text-gray-900">{eventName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">User</label>
              <p className="text-gray-900">{userName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Registration Date</label>
              <p className="text-gray-900">{formatDate(registration.registration_date)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <p className="text-gray-900 font-semibold">
                {formatCurrency(registration.payment_amount)}
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Created: {formatDate(registration.created_at)} | 
            Updated: {formatDate(registration.updated_at)}
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(registration)}
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

export default RegistrationCard;