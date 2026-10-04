import './styles/settings.css';
import './styles/content.css'
import type { Person } from '../types/person';
import { handleSettingsUpdate } from '../services/settingsService';
import { useNavigate } from 'react-router-dom';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

interface SettingsProps {
    user: Person;
    setUser: (person: Person | null) => void;
}

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save Changes'}
        </button>
    )
}

const Settings = ({ user, setUser }: SettingsProps) => {
    const navigate = useNavigate();

    async function handleUpdate(formData: FormData, userID: string): Promise<void> {
        const result = await handleSettingsUpdate(formData, userID);

        if (result.success && result.personData) {
            navigate('/');
            setUser(result.personData);
            toast.success('Account information updated successfully!');
        } else {
            toast.error('Failed to update account information.');
        }
    }

    return (
        <section className="content-page">
            <div className="content-card settings-card">
                <h1>Settings</h1>

                <p className="settings-intro">
                    Update your account information below.
                </p>

                <form
                    className="settings-form"
                    action={(formData) => handleUpdate(formData, user.id)}
                >
                    <div className="form-group">
                        <label htmlFor="firstName">
                            First Name *
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            defaultValue={user.firstName}
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">
                            Last Name *
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            defaultValue={user.lastName}
                            autoComplete="family-name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address *
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user.email}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="settings-submit">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Settings;