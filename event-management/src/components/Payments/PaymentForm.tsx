import React, { useState, useEffect } from 'react';
import { useCreatePaymentMutation, useUpdatePaymentMutation } from '../../features/Payments/paymentsApi';
import { useGetRegistrationsQuery } from '../../features/Registrations/registrationsApi';
import type { Payment, CreatePayment, UpdatePayment } from '../../types/types';

interface PaymentFormProps {
  payment?: Payment | null;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onClose }) => {
  const [formData, setFormData] = useState({
    payment_date: '',
    payment_status: 'pending' as 'pending' | 'completed' | 'failed',
    amount: '',
    payment_method: '',
    registration_id: '',
  });

  const { data: registrations } = useGetRegistrationsQuery();
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();
  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (payment) {
      setFormData({
        payment_date: payment.payment_date.split('T')[0],
        payment_status: payment.payment_status,
        amount: payment.amount.toString(),
        payment_method: payment.payment_method,
        registration_id: payment.registration_id.toString(),
      });
    } else {
      // Set default payment date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, payment_date: today }));
    }
  }, [payment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (payment) {
        // Update existing payment
        const updateData: UpdatePayment = {
          payment_date: formData.payment_date,
          payment_status: formData.payment_status,
          amount: parseFloat(formData.amount),
          payment_method: formData.payment_method,
        };
        await updatePayment({ id: payment.payment_id, data: updateData }).unwrap();
      } else {
        // Create new payment
        const createData: CreatePayment = {
          payment_date: formData.payment_date,
          payment_status: formData.payment_status,
          amount: parseFloat(formData.amount),
          payment_method: formData.payment_method,
          registration_id: parseInt(formData.registration_id),
        };
        await createPayment(createData).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="registration_id" className="block text-sm font-medium text-gray-700 mb-1">
            Registration *
          </label>
          <select
            id="registration_id"
            name="registration_id"
            value={formData.registration_id}
            onChange={handleChange}
            required
            disabled={!!payment} // Disable if editing
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">Select a registration</option>
            {registrations?.map((registration) => (
              <option key={registration.registration_id} value={registration.registration_id}>
                Registration #{registration.registration_id} - ${registration.payment_amount}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Date *
          </label>
          <input
            type="date"
            id="payment_date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method *
          </label>
          <select
            id="payment_method"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="other">Other</option>
          </select>
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : payment ? 'Update Payment' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;