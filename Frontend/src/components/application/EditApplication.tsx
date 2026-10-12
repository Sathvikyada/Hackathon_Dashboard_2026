import ApplicationForm from './applicationForm/ApplicationForm';
import type { Person } from '../../types/person';
import type { SubmitApplicationResult } from '../../services/applicationService';

import { handleSubmit } from '../../services/applicationService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface EditApplicationProps {
    user: Person;
    setUser: (person: Person | null) => void;
}

const EditApplication = ({ user, setUser }: EditApplicationProps) => {
    const navigate = useNavigate();

    async function submitForm(formData: FormData, userID: string): Promise<SubmitApplicationResult> {
        const result = await handleSubmit(formData, userID);

        if (result.success) {
            setUser(result.personData);
            toast.success('Application modified successfully!');
            navigate('/');
        }

        return result;
    }

    if (!user.application) {
        return (
            <div>
                <p>No application found.</p>
                <p>
                    Please reach out to the organizers at
                    hackumass@gmail.com for further assistance.
                </p>
            </div>
        );
    }

    return (
        <ApplicationForm
            user={user}
            application={user.application}
            submitForm={submitForm}
            submitText="Modify Application"
            draftKey="hackumassApplicationDraft:edit"
        />
    );
};

export default EditApplication;