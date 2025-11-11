import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Registration, CreateRegistration, UpdateRegistration, RegistrationWithDetails } from '../../types/types';

export const registrationsAPI = createApi({
    reducerPath: 'registrationsAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/registrations',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Registrations'],
    endpoints: (builder) => ({
        getRegistrations: builder.query<Registration[], void>({
            query: () => '/get-all',
            providesTags: ['Registrations'],
        }),

        getRegistration: builder.query<RegistrationWithDetails, number>({
            query: (registration_id) => `/get-registration/${registration_id}`,
            providesTags: ['Registrations'],
        }),

        createRegistration: builder.mutation<Registration, CreateRegistration>({
            query: (newRegistration) => ({
                url: '/create-registration',
                method: 'POST',
                body: newRegistration,
            }),
            invalidatesTags: ['Registrations'],
        }),

        updateRegistration: builder.mutation<Registration, { id: number; data: UpdateRegistration }>({
            query: ({ id, data }) => ({
                url: `/update-registration/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Registrations'],
        }),

        deleteRegistration: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-registration/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Registrations'],
        }),

        getRegistrationsByUser: builder.query<Registration[], number>({
            query: (user_id) => `/registrations/user/${user_id}`,
            providesTags: ['Registrations'],
        }),

        getRegistrationsByEvent: builder.query<Registration[], number>({
            query: (event_id) => `/registrations/event/${event_id}`,
            providesTags: ['Registrations'],
        }),
    }),
});

export const {
    useGetRegistrationsQuery,
    useGetRegistrationQuery,
    useCreateRegistrationMutation,
    useUpdateRegistrationMutation,
    useDeleteRegistrationMutation,
    useGetRegistrationsByUserQuery,
    useGetRegistrationsByEventQuery,
} = registrationsAPI;

export default registrationsAPI;