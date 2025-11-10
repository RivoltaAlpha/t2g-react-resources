# Event Management System

A comprehensive React TypeScript application for managing events, registrations, payments, and feedback with Redux Toolkit Query for state management.

## Features

### Core Functionality
- **Event Management**: Create, read, update, and delete events
- **User Management**: Manage user accounts with different roles (admin, organizer, attendee)
- **Registration System**: Handle event registrations with payment tracking
- **Payment Processing**: Track payment status and methods
- **Feedback System**: Collect and manage event feedback with ratings

### Technical Features
- **Redux Toolkit Query**: Efficient data fetching and caching
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component-Based Architecture**: Reusable and maintainable components
- **Local State Management**: Efficient state handling with Redux

## Database Schema Integration

The frontend is designed to work with the following database structure:

### Tables
- **users**: User management with roles and authentication
- **events**: Event information and details
- **registrations**: Event registration tracking
- **payments**: Payment processing and status tracking
- **feedbacks**: User feedback and ratings system

## Project Structure

```
src/
├── app/
│   └── store.ts                 # Redux store configuration
├── components/
│   ├── Events/
│   │   ├── EventCard.tsx        # Event display component
│   │   └── EventForm.tsx        # Event creation/editing form
│   ├── Users/
│   │   ├── UserCard.tsx         # User display component
│   │   └── UserForm.tsx         # User creation/editing form
│   ├── Registrations/
│   │   ├── RegistrationCard.tsx # Registration display component
│   │   └── RegistrationForm.tsx # Registration form
│   ├── Payments/
│   │   ├── PaymentCard.tsx      # Payment display component
│   │   └── PaymentForm.tsx      # Payment form
│   ├── Feedbacks/
│   │   ├── FeedbackCard.tsx     # Feedback display component
│   │   └── FeedbackForm.tsx     # Feedback form
│   ├── Navigation/
│   │   └── Navigation.tsx       # Main navigation component
│   └── UI/
│       ├── Modal.tsx            # Reusable modal component
│       └── LoadingSpinner.tsx   # Loading indicator
├── features/
│   ├── Events/
│   │   └── eventsApi.ts         # Events API endpoints
│   ├── Users/
│   │   ├── usersApi.ts          # Users API endpoints
│   │   └── userActionsSlice.ts  # User actions state slice
│   ├── Registrations/
│   │   └── registrationsApi.ts  # Registrations API endpoints
│   ├── Payments/
│   │   └── paymentsApi.ts       # Payments API endpoints
│   └── Feedbacks/
│       └── feedbacksApi.ts      # Feedbacks API endpoints
├── pages/
│   ├── Dashboard.tsx            # Main dashboard with overview
│   ├── EventsDashboard.tsx      # Events management page
│   ├── UsersDashboard.tsx       # Users management page
│   ├── RegistrationsDashboard.tsx # Registrations management page
│   ├── PaymentsDashboard.tsx    # Payments management page
│   └── FeedbacksDashboard.tsx   # Feedback management page
├── types/
│   └── types.ts                 # TypeScript type definitions
└── App.tsx                      # Main application component
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Required Dependencies
Install the following packages:

```bash
npm install @reduxjs/toolkit react-redux redux-persist
```

### Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Redux packages**
   ```bash
   npm install @reduxjs/toolkit react-redux redux-persist
   ```

3. **Configure Backend URL**
   Update the `baseUrl` in all API files to match your backend endpoint:
   ```typescript
   // In features/*/api.ts files
   baseQuery: fetchBaseQuery({ 
     baseUrl: 'YOUR_BACKEND_URL_HERE',
     // ... other configuration
   })
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## API Integration

The application is configured to work with a REST API backend. Update the following:

### Backend Configuration
- Update `baseUrl` in all API files (`features/*/api.ts`)
- Ensure your backend implements the expected endpoints:
  - `/users` - User management
  - `/events` - Event management
  - `/registrations` - Registration management
  - `/payments` - Payment management
  - `/feedbacks` - Feedback management

### Authentication
The app includes token-based authentication setup. Ensure your backend:
- Returns JWT tokens on login
- Accepts Bearer tokens in Authorization headers
- Implements proper CORS policies

## Usage

### Navigation
Use the top navigation bar to switch between different sections:
- **Dashboard**: Overview of all system statistics
- **Events**: Manage events (create, edit, delete)
- **Registrations**: View and manage event registrations
- **Payments**: Track payment status and processing
- **Feedback**: View and manage user feedback
- **Users**: Manage user accounts and roles

### Key Features

#### Event Management
- Create new events with details (name, date, location, description)
- View event statistics (registrations, ratings, reviews)
- Edit existing events
- Delete events (with confirmation)

#### Registration System
- Register users for events
- Track payment status (pending, completed, failed)
- Filter registrations by status
- View registration statistics

#### Payment Tracking
- Record payments with different methods
- Update payment status
- View revenue statistics
- Filter by payment method and status

#### Feedback Management
- Collect user feedback with ratings (1-5 stars)
- View average ratings and review distribution
- Filter feedback by rating
- Manage feedback comments

#### User Management
- Add new users with role assignment
- Edit user information
- Filter users by role
- Search users by name, email, or phone

## Component Props & State

### Component Communication
Components use props for data passing and callbacks for actions:

```typescript
// Example: EventCard component
interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: () => void;
}
```

### Local State Management
Each form component manages its own local state:

```typescript
// Example: Event form state
const [formData, setFormData] = useState({
  event_name: '',
  event_date: '',
  event_location: '',
  event_description: '',
});
```

### Global State with Redux
RTK Query handles server state automatically with caching and background updates.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Contributing

1. Follow the existing code structure
2. Maintain TypeScript type safety
3. Use consistent naming conventions
4. Add proper error handling
5. Test components thoroughly

## License

This project is available for educational and commercial use.