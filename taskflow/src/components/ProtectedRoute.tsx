import { IonSpinner } from '@ionic/react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="loading-screen">
        <IonSpinner name="crescent" />
      </div>
    );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
