import './styles/accepted.css';
import { getRSVPStatusDisplay } from '../../services/routeService';
import { PendingRSVP } from './PendingRSVP';
import { AcceptedRSVP } from './AcceptedRSVP';
import { DeclinedRSVP } from './DeclinedRSVP';
import type { Person } from '../../types/person';

interface AcceptedProps {
    user: Person;
    setUser: (user: Person | null) => void;
}

const Accepted = ({ user, setUser }: AcceptedProps) => {
    const rsvpStatus = getRSVPStatusDisplay(user);

    return (
        <div className="accepted-status">
            <h2>Hey {user.firstName}, You're Accepted!</h2>

            <p>
                <strong>Check-in</strong> will take place at the{' '}
                <a
                    href="https://fac.umass.edu/Online/default.asp?BOparam::WScontent::loadArticle::permalink=Ballroom&BOparam::WScontent::loadArticle::context_id="
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong>Student Union Ballroom</strong>
                </a>.
                {' '}Bring your QR code, and you'll be all set to check in!
            </p>

            <p>
                HackUMass will take place in the{' '}
                <a
                    href="https://www.google.com/maps?q=Integrative+Learning+Center,+UMass+Amherst"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong>Integrative Learning Center (ILC)</strong>
                </a>{' '}
                this year.
            </p>

            <p>
                If you have any questions, check out our FAQ or ask us in
                {' '}<strong>#ask-organizer</strong> on Discord, or email us at{' '}
                <a href="mailto:hackumass@gmail.com">
                    hackumass@gmail.com
                </a>.
                {' '}Join Discord and follow our social media for live updates!
            </p>

            {rsvpStatus && rsvpStatus === 'RSVP Accepted' && <AcceptedRSVP user={user} />}
            {rsvpStatus && rsvpStatus === 'RSVP Pending' && <PendingRSVP user={user} setUser={setUser} />}
            {rsvpStatus && rsvpStatus === 'RSVP Declined' && <DeclinedRSVP />}
        </div>
    );
};

export { Accepted };