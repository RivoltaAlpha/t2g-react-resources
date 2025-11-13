import { createApi } from '@reduxjs/toolkit/query/react';
import type { Event, CreateEvent, UpdateEvent, EventWithDetails } from '../../types/types';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const eventsAPI = createApi({
    reducerPath: 'eventsAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000/events',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        getEvents: builder.query<Event[], void>({
            query: () => '/get-all',
            providesTags: ['Events'], // to enable automatic refetching
        }),

        getEvent: builder.query<EventWithDetails, number>({
            query: (event_id) => `/get-event/${event_id}`,
            providesTags: ['Events'], // to enable automatic refetching based on event updates
        }),

        createEvent: builder.mutation<Event, CreateEvent>({
            query: (newEvent) => ({
                url: '/create-event',
                method: 'POST',
                body: newEvent,
            }),
            invalidatesTags: ['Events'], // to refetch the events list
        }),

        // [1,2,3] - original
        // [1,2,3,4] - after adding new event
        /// refetch the events list

        updateEvent: builder.mutation<Event, { id: number; data: UpdateEvent }>({
            query: ({ id, data }) => ({
                url: `/update-event/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Events'], // to refetch the events list
        }),

        deleteEvent: builder.mutation<{ success: boolean}, number>({
            query: (id) => ({
                url: `/delete-event/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'], // deals with cache invalidation and refetching
        }),

        getEventsByUser: builder.query<Event[], number>({
            query: (user_id) => `/events/user/${user_id}`,
            providesTags: ['Events'],
        }),
    }),
});

export const {
    useGetEventsQuery,
    useGetEventQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useGetEventsByUserQuery,
} = eventsAPI;

export default eventsAPI;