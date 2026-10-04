import type { Person } from '../../types/person';
import { handleSubmit } from '../../services/applicationService';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ApplicationForm from './ApplicationForm';


interface ApplyProps {
    user: Person;
    setUser: (person: Person | null) => void;
}

const Apply = ({ user, setUser }: ApplyProps) => {
    const navigate = useNavigate();

    async function submitForm(formData: FormData, userID: string): Promise<void> {
        const result = await handleSubmit(formData, userID);

        if (result.success) {
            navigate('/', { replace: true });
            setUser(result.personData);
            toast.success('Application submitted successfully!');
        } else {
            toast.error(result.error);
        }
    }

    return (
        <ApplicationForm user={user} submitForm={submitForm} submitText="Submit Application" />
    );
};

export default Apply;
