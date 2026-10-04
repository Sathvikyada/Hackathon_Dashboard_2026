import type { Person } from '../types/person'
import type { PageOption } from '../types/PageOption'

import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
    user: Person | null;
    pageOptions: Set<PageOption>;
    option: PageOption;
    children: React.ReactNode;
}

function ProtectedRoute({ user, pageOptions, option, children }: ProtectedRouteProps) {
    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }
    if (!pageOptions.has(option)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;