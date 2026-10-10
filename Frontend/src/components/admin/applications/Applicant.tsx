import '../../styles/content.css';
import './styles/applicant.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import type { Person } from '../../../types/person';
import ApplicantInfo from './ApplicantInfo';
import { getParticipantById, updateApplicationDecision } from '../../../services/adminApplicationService';

interface ApplicantRequestState {
    id: string | null;
    status: 'loading' | 'success' | 'error';
    applicant: Person | null;
}

interface ApplicantNavigationState {
    applicantIds?: string[];
}

interface ApplicantProps {
    user: Person;
}

const Applicant = ({ user }: ApplicantProps) => {
    // The id is in the URL parameters, which we extract using the useParams hook from react-router-dom
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const navigationState = location.state as ApplicantNavigationState | null;
    const applicantIds = navigationState?.applicantIds ?? [];

    const currentIndex = id ? applicantIds.indexOf(id) : -1;
    const previousId = currentIndex > 0 ? applicantIds[currentIndex - 1] : null;
    const nextId = currentIndex !== -1 && currentIndex < applicantIds.length - 1 ? applicantIds[currentIndex + 1] : null;

    const goToPreviousApplicant = () => {
        if (!previousId) {
            return;
        }

        navigate(`/applicant/${previousId}`, {state: navigationState});
    };

    const goToNextApplicant = () => {
        if (!nextId) {
            return;
        }

        navigate(`/applicant/${nextId}`, {state: navigationState});
    };

    const [updatingDecision, setUpdatingDecision] = useState(false);

    const [requestState, setRequestState] =
        useState<ApplicantRequestState>({
            id: null,
            status: 'loading',
            applicant: null
        });
    

    // We use a useEffect hook to fetch the applicant data when the component mounts or when the ID changes
    // If we just call getParticipantById directly without useEffect, it would couple the fetching logic with the rendering logic, leading to potential issues with stale data and side effects.
    useEffect(() => {
        if (!id) {
            return;
        }

        let canceled = false;

        // Can only use the fetch function inside a async while in the useEffects hook as the useEffects cannot wait for a promise rather it can invoke a async function to wait for it while it executes
        async function fetchApplicant(id: string): Promise<void> {
            try {
                const person = await getParticipantById(id);

                if (canceled) {
                    return;
                }
                setRequestState({
                    id,
                    status: 'success',
                    applicant: person
                });
            } catch (err) {
                if (canceled) {
                    return;
                }

                setRequestState({
                    id,
                    status: 'error',
                    applicant: null
                });

                toast.error('Failed to load applicant data');
                console.error(err);
            }
        }

        fetchApplicant(id);
        // Canceled flag to prevent updating state if the component unmounts before the fetch completes
        // So when the user rapidly requests different applicants, the component won't update state with stale data from a previous fetch.
        return () => {
            canceled = true;
        };
    }, [id]);

    if (!id) {
        return (
            <section className="content-page">
                <div className="content-card applicant-card">
                    <p>Invalid applicant ID.</p>
                </div>
            </section>
        );
    }

    const loading = requestState.status === 'loading' || requestState.id !== id;

    if (loading) {
        return (
            <section className="content-page">
                <div className="content-card applicant-card">
                    <p>Loading applicant data...</p>
                </div>
            </section>
        );
    }

    if (requestState.status === 'error' || !requestState.applicant) {
        return (
            <section className="content-page">
                <div className="content-card applicant-card">
                    <p>Unable to load applicant data.</p>
                </div>
            </section>
        );
    }

    const handleUpdateDecision = async (decision: Person['applicationDecision']) => {
        if (decision === requestState.applicant?.applicationDecision) {
            return;
        }
        
        try {
            setUpdatingDecision(true);
            const updatedApplicant = await updateApplicationDecision(id, decision, user);
            setRequestState({
                id,
                status: 'success',
                applicant: updatedApplicant
            });
            toast.success(`Application marked as ${decision}`);
        } catch (err) {
            toast.error('Failed to update application decision');
            console.error(err);
        } finally {
            setUpdatingDecision(false);
        }
    };
    
    const applicant = requestState.applicant;

    return (
        <section className="content-page">
            <div className="content-card applicant-card">

                <div className="applicant-top-actions">
                    <button
                        type="button"
                        className="back-to-applications"
                        disabled={updatingDecision}
                        onClick={() => navigate('/applications')}
                    >
                        ← Back to Applications
                    </button>
                </div>
                
                {currentIndex !== -1 && (
                    <div className="applicant-navigation">
                        <button
                            type="button"
                            disabled={!previousId || updatingDecision}
                            onClick={goToPreviousApplicant}
                        >
                            Previous
                        </button>

                        <span>
                            {currentIndex + 1} of {applicantIds.length}
                        </span>

                        <button
                            type="button"
                            disabled={!nextId || updatingDecision}
                            onClick={goToNextApplicant}
                        >
                            Next
                        </button>
                    </div>
                )}

                <ApplicantInfo applicant={applicant} />

                <section className="applicant-decision">
                    <h2>Application Decision</h2>

                    <p>
                        Current decision:{' '}
                        <strong>
                            {applicant.applicationDecision}
                        </strong>
                    </p>

                    <div className="applicant-decision-buttons">
                        <button
                            type="button"
                            className="decision-button accept"
                            onClick={() => handleUpdateDecision('Accepted')}
                            disabled={updatingDecision}
                        >
                            Accept
                        </button>

                        <button
                            type="button"
                            className="decision-button waitlist"
                            onClick={() => handleUpdateDecision('Waitlisted')}
                            disabled={updatingDecision}
                        >
                            Waitlist
                        </button>

                        <button
                            type="button"
                            className="decision-button reject"
                            onClick={() => handleUpdateDecision('Rejected')}
                            disabled={updatingDecision}
                        >
                            Reject
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Applicant;