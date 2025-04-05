import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Assuming you can expose a loading state

  if (loading) {
    return <div className="text-center mt-10 text-blue-800">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}