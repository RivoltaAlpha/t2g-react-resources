import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard';
import EventsDashboard from './pages/EventsDashboard';
import RegistrationsDashboard from './pages/RegistrationsDashboard';
import PaymentsDashboard from './pages/PaymentsDashboard';
import FeedbacksDashboard from './pages/FeedbacksDashboard';
import UsersDashboard from './pages/UsersDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { store } from './app/store';
import type { RootState } from './app/store';
import './App.css';

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

// App Router Component (needs to be inside Provider to access Redux state)
const AppRouter = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } 
        />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <EventsDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/registrations" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <RegistrationsDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <PaymentsDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/feedbacks" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <FeedbacksDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <UsersDashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />

        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
        
        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
