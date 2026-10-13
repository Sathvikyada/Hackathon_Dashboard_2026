import './styles/content.css'
import './styles/signIn.css'
import type { Person } from '../types/person';
import { signIn } from '../services/signInService'
import { toast } from 'react-toastify';
import { useDocumentTitle } from '../useDocumentTitle'

interface SignInProps {
    setUser: (person: Person | null) => void;
}

const SignIn = ({setUser}: SignInProps) => {
    useDocumentTitle('Sign In');

    async function handleSignIn(formData: FormData) {
        const email = formData.get('email');

        if (typeof email !== 'string' || email.trim() === '') {
            toast.error('Please enter a valid email address.');
        } else {
            const { success, personData } = await signIn(email);

            if (success && personData) {
                setUser(personData);
                toast.success('Sign-in successful!');
            } else {
                toast.error('Sign-in failed. Please check your email and try again.');
            }
        }
    }

    return (
        <section className="content-page">
            <div className="content-card">
                <h1>Sign In</h1>

                <form className="sign-in-form" action={handleSignIn}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter the email associated with your HackUMass application."
                            required
                        />
                    </div>

                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SignIn;