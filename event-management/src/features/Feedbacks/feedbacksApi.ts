import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Feedback, CreateFeedback, UpdateFeedback } from '../../types/types';

export const feedbacksAPI = createApi({
    reducerPath: 'feedbacksAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/feedbacks',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Feedbacks'],
    endpoints: (builder) => ({
        getFeedbacks: builder.query<Feedback[], void>({
            query: () => '/get-all',
            providesTags: ['Feedbacks'],
        }),

        getFeedback: builder.query<Feedback, number>({
            query: (feedback_id) => `/get-feedback/${feedback_id}`,
            providesTags: ['Feedbacks'],
        }),

        createFeedback: builder.mutation<Feedback, CreateFeedback>({
            query: (newFeedback) => ({
                url: '/create-feedback',
                method: 'POST',
                body: newFeedback,
            }),
            invalidatesTags: ['Feedbacks'],
        }),

        updateFeedback: builder.mutation<Feedback, { id: number; data: UpdateFeedback }>({
            query: ({ id, data }) => ({
                url: `/update-feedback/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Feedbacks'],
        }),

        deleteFeedback: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-feedback/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Feedbacks'],
        }),

        getFeedbacksByEvent: builder.query<Feedback[], number>({
            query: (event_id) => `/feedbacks/event/${event_id}`,
            providesTags: ['Feedbacks'],
        }),

        getFeedbacksByUser: builder.query<Feedback[], number>({
            query: (user_id) => `/feedbacks/user/${user_id}`,
            providesTags: ['Feedbacks'],
        }),
    }),
});

export const {
    useGetFeedbacksQuery,
    useGetFeedbackQuery,
    useCreateFeedbackMutation,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation,
    useGetFeedbacksByEventQuery,
    useGetFeedbacksByUserQuery,
} = feedbacksAPI;

export default feedbacksAPI;