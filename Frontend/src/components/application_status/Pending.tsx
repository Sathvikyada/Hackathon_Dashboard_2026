import './styles/pending.css';
import type { StatusProps } from '../../types/StatusProps';

const Pending = ({ user }: StatusProps) => {
    return (
        <div className="pending-status">
            <h2>Hey {user.firstName},</h2>

            <p>
                Looks like we got your registration. Yay! 🎉
            </p>

            <p>
                If there's anything you would like to change in your
                registration, head over to Edit Application and make any
                edits you want.
            </p>

            <p>
                We will let you know your application status soon.
                Thanks for applying!
            </p>
        </div>
    );
};

export { Pending };