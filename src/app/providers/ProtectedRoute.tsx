import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/user'; // Берем селектор из сущности

interface ProtectedRouteProps {
    children: ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuth = useSelector(getUserAuthData);
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};
