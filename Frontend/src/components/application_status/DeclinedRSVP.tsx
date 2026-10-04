import './styles/declinedRSVP.css';

const DeclinedRSVP = () => {
    return (
        <div className="rsvp-declined">
            <h3>RSVP Declined</h3>

            <p>
                Thank you for letting us know that you won't be able to attend
                HackUMass.
            </p>

            <p>
                Your response has been recorded. We appreciate you taking the
                time to update your RSVP, and we hope to see you at a future
                HackUMass event!
            </p>
        </div>
    );
};

export { DeclinedRSVP };