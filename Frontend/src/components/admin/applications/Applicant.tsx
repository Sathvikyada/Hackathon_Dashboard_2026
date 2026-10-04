import '../../styles/content.css';
import './styles/applicant.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import type { Person } from '../../../types/person';
import ApplicantInfo from './ApplicantInfo';
import { getParticipantById } from '../../../services/adminApplicationService';

const Applicant = () => {
    // The id is in the URL parameters, which we extract using the useParams hook from react-router-dom
    const { id } = useParams();

    // Use a useState here to store the applicant data fetched from the service and re-render it when we update it with the application decision
    const [applicant, setApplicant] = useState<Person | null>(null);

    // We use a useEffect hook to fetch the applicant data when the component mounts or when the ID changes
    // If we just call getParticipantById directly without useEffect, it would couple the fetching logic with the rendering logic, leading to potential issues with stale data and side effects.
    useEffect(() => {
        if (!id) {
            toast.error('Invalid applicant ID');
            return;
        }

        // Can only use the fetch function inside a async while in the useEffects hook as the useEffects cannot wait for a promise rather it can invoke a async function to wait for it while it executes
        async function fetchApplicant(id: string): Promise<void> {
            try {
                const person = await getParticipantById(id);
                setApplicant(person);
            } catch (error) {
                toast.error('Failed to load applicant data');
                console.error(error);
            }
        }

        fetchApplicant(id);
    }, [id]);

    if (!applicant) {
        return <p>Loading applicant data...</p>;
    }

    return (
        <section className="content-page">
            <div className="content-card applicant-card">

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
                        >
                            Accept
                        </button>

                        <button
                            type="button"
                            className="decision-button waitlist"
                        >
                            Waitlist
                        </button>

                        <button
                            type="button"
                            className="decision-button reject"
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