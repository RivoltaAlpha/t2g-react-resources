import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Payment, CreatePayment, UpdatePayment } from '../../types/types';

export const paymentsAPI = createApi({
    reducerPath: 'paymentsAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/payments',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Payments'],
    endpoints: (builder) => ({
        getPayments: builder.query<Payment[], void>({
            query: () => '/payments',
            providesTags: ['Payments'],
        }),

        getPayment: builder.query<Payment, number>({
            query: (payment_id) => `/payments/${payment_id}`,
            providesTags: ['Payments'],
        }),

        createPayment: builder.mutation<Payment, CreatePayment>({
            query: (newPayment) => ({
                url: '/payments',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Payments'],
        }),

        updatePayment: builder.mutation<Payment, { id: number; data: UpdatePayment }>({
            query: ({ id, data }) => ({
                url: `/payments/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Payments'],
        }),

        deletePayment: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payments'],
        }),

        getPaymentsByRegistration: builder.query<Payment[], number>({
            query: (registration_id) => `/payments/registration/${registration_id}`,
            providesTags: ['Payments'],
        }),
    }),
});

export const {
    useGetPaymentsQuery,
    useGetPaymentQuery,
    useCreatePaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
    useGetPaymentsByRegistrationQuery,
} = paymentsAPI;

export default paymentsAPI;