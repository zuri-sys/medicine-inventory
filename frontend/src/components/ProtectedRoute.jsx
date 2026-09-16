import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }) { return sessionStorage.getItem('authenticated') === 'true' ? children : <Navigate to="/login" replace /> }
