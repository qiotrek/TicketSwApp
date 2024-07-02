import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { setItem } from "../Hooks/useLocalStorage";
import { useAuth } from "../context/AuthContext";
import { RoutingSettings } from "../RoutingSettings";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: string[];
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps): any {
    const [prevLocation, setPrevLocation] = useState<string | null>(null);
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== prevLocation) {
            setPrevLocation(location.pathname);
            setItem('prevLocation', location.pathname);
        }
    }, [location.pathname, prevLocation])

    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    if (roles !== undefined) {
        const userHasPermissions = roles.includes(user.role);

        if (!userHasPermissions) {
            const filteredRoutingSettings = RoutingSettings.filter((item) => {
                return item.children.some((child) => child.roles.includes(user?.role as string));
            })
            return <Navigate to={filteredRoutingSettings[0].children[0].path} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
