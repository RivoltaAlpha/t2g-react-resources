export const mockData = {
  users: [
    {
      user_id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1234567890",
      role: "organizer",
      created_at: "2024-01-15"
    },
    {
      user_id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1234567891",
      role: "attendee",
      created_at: "2024-02-20"
    },
    {
      user_id: 3,
      name: "Carol White",
      email: "carol@example.com",
      phone: "+1234567892",
      role: "attendee",
      created_at: "2024-03-10"
    }
  ],
  events: [
    {
      event_id: 1,
      event_name: "Tech Conference 2024",
      event_date: "2024-12-15",
      event_location: "San Francisco, CA",
      event_description: "Annual technology conference featuring the latest innovations",
      created_by: 1,
      created_at: "2024-01-20"
    },
    {
      event_id: 2,
      event_name: "Music Festival",
      event_date: "2024-11-20",
      event_location: "Austin, TX",
      event_description: "Three-day music festival with diverse artists",
      created_by: 1,
      created_at: "2024-02-15"
    },
    {
      event_id: 3,
      event_name: "Food & Wine Expo",
      event_date: "2024-10-30",
      event_location: "New York, NY",
      event_description: "Culinary exhibition showcasing local and international cuisine",
      created_by: 1,
      created_at: "2024-03-01"
    }
  ],
  registrations: [
    {
      registration_id: 1,
      user_id: 2,
      event_id: 1,
      registration_date: "2024-02-25",
      payment_status: "completed",
      payment_amount: 299.99
    },
    {
      registration_id: 2,
      user_id: 3,
      event_id: 1,
      registration_date: "2024-03-15",
      payment_status: "completed",
      payment_amount: 299.99
    },
    {
      registration_id: 3,
      user_id: 2,
      event_id: 2,
      registration_date: "2024-03-20",
      payment_status: "pending",
      payment_amount: 150.00
    }
  ],
  feedbacks: [
    {
      feedback_id: 1,
      user_id: 2,
      event_id: 1,
      rating: 5,
      comments: "Amazing conference! Learned so much.",
      created_at: "2024-12-16"
    },
    {
      feedback_id: 2,
      user_id: 3,
      event_id: 1,
      rating: 4,
      comments: "Great speakers, but venue was a bit crowded.",
      created_at: "2024-12-16"
    }
  ]
};