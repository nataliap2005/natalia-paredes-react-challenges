import {Navigate} from 'react-router-dom';
import {IonLoading} from '@ionic/react';
import {useAuth} from '../contexts/AuthContext';
import type {ReactNode} from 'react';
export default function ProtectedRoute({children}:{children:ReactNode}){const {user,loading}=useAuth();
 if(loading)return <IonLoading isOpen message="Cargando sesión..." />;
 if(!user)return <Navigate to="/login" replace />;
 return <>{children}</>;
}
