import './styles/waitlisted.css';
import type { StatusProps } from '../../types/StatusProps';

const Waitlisted = ({ user }: StatusProps) => {
    return (
        <div className="waitlisted-status">
            <h2>Hey {user.firstName},</h2>

            <p>
                Thanks for registering for HackUMass!
            </p>

            <p>
                At this time, we are experiencing a high volume of requests.
                While we appreciate your patience, we'll have to ask you to
                hold on a little longer. Please stay tuned for further updates.
            </p>

            <p>
                We will let you know your registration status soon.
                Thanks for applying!
            </p>
        </div>
    );
};

export { Waitlisted };