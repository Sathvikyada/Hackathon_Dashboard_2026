import '../styles/content.css'
import { Accepted } from './Accepted';
import { Rejected } from './Rejected';
import { Pending } from './Pending';
import { Waitlisted } from './Waitlisted';

import { getApplicationStatusDisplay } from '../../services/routeService';
import type { Person } from '../../types/person';

interface ApplicationStatusProps {
    user: Person | null;
    setUser: (user: Person | null) => void;
}

const ApplicationStatus = ({ user, setUser }: ApplicationStatusProps) => {
    if (!user) {
        return null
    }

    const statusDisplay = getApplicationStatusDisplay(user);
    
    return (
        <section className="content-page">
            <div className="content-card">
                <h1>Application Status Page</h1>

                {statusDisplay && statusDisplay === 'Accepted' && (
                    <Accepted user={user} setUser={setUser} />
                )}

                {statusDisplay && statusDisplay === 'Rejected' && (
                    <Rejected user={user} />
                )}

                {statusDisplay && statusDisplay === 'Pending' && (
                    <Pending user={user} />
                )}

                {statusDisplay && statusDisplay === 'Waitlisted' && (
                    <Waitlisted user={user} />
                )}
            </div>
        </section>
    )
}

export default ApplicationStatus