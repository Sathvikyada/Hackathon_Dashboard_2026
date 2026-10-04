import './styles/pendingRSVP.css';
import { handleRSVPUpdate } from '../../services/rsvpService';
import { useState } from 'react';
import { toast } from 'react-toastify';

import type { Person } from '../../types/person';

interface PendingRSVPProps {
    user: Person;
    setUser: (user: Person | null) => void;
}

const PendingRSVP = ({ user, setUser }: PendingRSVPProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const RSVPUpdate = async (userId: string, newStatus: 'Accepted' | 'Declined') => {
        setIsUpdating(true);
        const updatedUser = await handleRSVPUpdate(userId, newStatus);
        setIsUpdating(false);

        if (updatedUser) {
            setUser(updatedUser);
            toast.success(
                newStatus === 'Accepted'
                    ? 'RSVP accepted successfully!'
                    : 'RSVP declined successfully!'
            );
        } else {
            toast.error('Failed to update your RSVP. Please try again.');
        }
    }

    return (
        <div className="rsvp-section">
            <h3>RSVP</h3>

            <p>
                In order to participate, make sure to RSVP with the button below. If for any reason you cannot attend, please let us know by clicking the decline button below.
            </p>

            <p>
                By clicking the RSVP button, you are letting us know that you
                will <strong>definitely</strong> attend the event. We use RSVPs
                to ensure that there are enough mentors, judges, and volunteers
                available. Please only RSVP if you are sure you'll be attending.
            </p>

            <div className="rsvp-actions" aria-busy={isUpdating}>
                <button
                    type="button"
                    className="rsvp-button rsvp-accept-button"
                    onClick={() => RSVPUpdate(user.id, 'Accepted')}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'RSVP'}
                </button>

                <button
                    type="button"
                    className="rsvp-button rsvp-decline-button"
                    onClick={() => RSVPUpdate(user.id, 'Declined')}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : "I Can't Attend"}
                </button>
            </div>
        </div>
    );
};

export { PendingRSVP };
