import './styles/acceptedRSVP.css';
import type { StatusProps } from '../../types/StatusProps';
import QRCode from 'react-qr-code';

const AcceptedRSVP = ({ user }: StatusProps) => {
    return (
        <div className="rsvp-accepted">
            <h3>You're All Set! 🎉</h3>

            <p>
                Thank you for confirming your attendance! We look forward to
                seeing you at HackUMass.
            </p>

            <p>
                Please have your check-in QR code ready when you arrive.
                You'll use it to check in at the event.
            </p>

            <div className="qr-section">
                <h4>Your Check-In QR Code</h4>

                <div className="qr-placeholder">
                    <QRCode
                        value={String(user.id)}
                        size={200}
                    />
                </div>

                <p className="qr-instructions">
                    Present this QR code to an organizer when you arrive.
                </p>
            </div>
        </div>
    );
};

export { AcceptedRSVP };