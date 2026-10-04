import './styles/rejected.css';
import type { StatusProps } from '../../types/StatusProps';

const Rejected = ({ user }: StatusProps) => {
    return (
        <div className="rejected-status">
            <h2>Hello {user.firstName},</h2>

            <p>
                Unfortunately, we aren't able to accommodate everyone who wants
                to participate, and we've had to reject your registration. We
                hope that you'll continue your enthusiasm for hacking and apply
                to other awesome hackathons.
            </p>

            <p>
                Thanks again for applying to HackUMass, and we hope that you'll
                apply again next year.
            </p>

            <div className="rejected-actions">
                <a
                    href="https://mlh.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rejected-hackathons-button"
                >
                    Check Out Other Hackathons
                </a>
            </div>
        </div>
    );
};

export { Rejected };