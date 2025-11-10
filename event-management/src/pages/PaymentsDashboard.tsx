import React, { useState } from 'react';
import { useGetPaymentsQuery, useDeletePaymentMutation } from '../features/Payments/paymentsApi';
import { useGetRegistrationsQuery } from '../features/Registrations/registrationsApi';
import PaymentCard from '../components/Payments/PaymentCard';
import PaymentForm from '../components/Payments/PaymentForm';
import Modal from '../components/UI/Modal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import type { Payment } from '../types/types';

const PaymentsDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const { data: payments, isLoading } = useGetPaymentsQuery();
  const { data: registrations } = useGetRegistrationsQuery();
  const [deletePayment] = useDeletePaymentMutation();

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleDelete = async (paymentId: number) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await deletePayment(paymentId).unwrap();
      } catch (error) {
        console.error('Failed to delete payment:', error);
      }
    }
  };

  const handleCreate = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const filteredPayments = payments?.filter(payment => {
    const matchesStatus = statusFilter === 'all' || payment.payment_status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.payment_method === methodFilter;
    return matchesStatus && matchesMethod;
  }) || [];

  // Get unique payment methods for filter
  const paymentMethods = Array.from(new Set(payments?.map(payment => payment.payment_method) || []));

  // Calculate totals
  const totalAmount = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const completedAmount = payments?.filter(p => p.payment_status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0) || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Payments Dashboard</h1>
        <button
          onClick={handleCreate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Record Payment
        </button>
      </div>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-orange-600">{payments?.length || 0}</div>
          <div className="text-sm text-gray-600">Total Payments</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">
            {payments?.filter(p => p.payment_status === 'completed').length || 0}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600">
            {payments?.filter(p => p.payment_status === 'pending').length || 0}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-lg font-bold text-blue-600">{formatCurrency(totalAmount)}</div>
          <div className="text-sm text-gray-600">Total Amount</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-lg font-bold text-green-600">{formatCurrency(completedAmount)}</div>
          <div className="text-sm text-gray-600">Completed Amount</div>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <PaymentCard
            key={payment.payment_id}
            payment={payment}
            registration={registrations?.find(r => r.registration_id === payment.registration_id)}
            onEdit={handleEdit}
            onDelete={() => handleDelete(payment.payment_id)}
          />
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No payments found.</div>
        </div>
      )}

      {/* Payment Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPayment ? 'Edit Payment' : 'Record New Payment'}
      >
        <PaymentForm
          payment={selectedPayment}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default PaymentsDashboard;