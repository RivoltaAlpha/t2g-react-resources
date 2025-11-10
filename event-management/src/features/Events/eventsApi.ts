import { createApi } from '@reduxjs/toolkit/query/react';
import type { Event, CreateEvent, UpdateEvent, EventWithDetails } from '../../types/types';
import baseQueryWithAuth from '../../utils/baseQuery';

export const eventsAPI = createApi({
    reducerPath: 'eventsAPI',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        getEvents: builder.query<Event[], void>({
            query: () => '/events',
            providesTags: ['Events'],
        }),

        getEvent: builder.query<EventWithDetails, number>({
            query: (event_id) => `/events/${event_id}`,
            providesTags: ['Events'],
        }),

        createEvent: builder.mutation<Event, CreateEvent>({
            query: (newEvent) => ({
                url: '/events',
                method: 'POST',
                body: newEvent,
            }),
            invalidatesTags: ['Events'],
        }),

        updateEvent: builder.mutation<Event, { id: number; data: UpdateEvent }>({
            query: ({ id, data }) => ({
                url: `/events/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Events'],
        }),

        deleteEvent: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/events/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'],
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