import '../../styles/content.css'
import './styles/applications.css';

import type { Person } from '../../../types/person';
import { getAllParticipants } from '../../../services/adminApplicationService';

import { useEffect, useState } from 'react';

import ApplicationsTable from './ApplicationsTable';
import ParticipantFilters, { type ParticipantFilter } from './ApplicationsFilter';

const Applications = () => {
    const [participants, setParticipants] = useState<Person[]>([]);
    const [filters, setFilters] = useState<ParticipantFilter[]>([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const data = await getAllParticipants();
                setParticipants(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchParticipants();
    }, []);

    return (
        <section className="content-page applications-page">
            <div className="content-card applications-card">
                <div className="applications-heading">
                    <h1>Applications</h1>
                    <p>{participants.length} participants</p>
                </div>
                
                <ParticipantFilters
                    filters={filters}
                    setFilters={setFilters}
                />

                <ApplicationsTable participants={participants} />

            </div>
        </section>
    );
};

export default Applications;