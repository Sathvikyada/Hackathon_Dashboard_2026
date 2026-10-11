import type { Person } from '../../types/person';
import type { SubmitApplicationResult } from '../../services/applicationService';

import { handleSubmit } from '../../services/applicationService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ApplicationForm from './ApplicationForm';


interface ApplyProps {
    user: Person;
    setUser: (person: Person | null) => void;
}

const Apply = ({ user, setUser }: ApplyProps) => {
    const navigate = useNavigate();

    async function submitForm(formData: FormData, userID: string): Promise<SubmitApplicationResult> {
        const result = await handleSubmit(formData, userID);

        if (result.success) {
            setUser(result.personData);

            toast.success(
                'Application submitted successfully!'
            );

            navigate('/', { replace: true });
        }

        return result;
    }

    return (
        <ApplicationForm
            user={user}
            submitForm={submitForm}
            submitText="Submit Application"
        />
    );
};

export default Apply;