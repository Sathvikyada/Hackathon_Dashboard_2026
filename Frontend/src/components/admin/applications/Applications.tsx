import '../../styles/content.css'
import './styles/applications.css';

import type { Person } from '../../../types/person';
import { getAllParticipants } from '../../../services/adminApplicationService';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ApplicationsTable from './ApplicationsTable';
import type { ParticipantFilter } from './filter/filterTypes';
import ApplicationsFilter from './filter/ApplicationsFilter';
import { filterParticipants } from './filter/filterParticipants';

const FILTER_STORAGE_KEY = 'applicationFilters';

const Applications = () => {
    const [participants, setParticipants] = useState<Person[]>([]);

    const [filters, setFilters] = useState<ParticipantFilter[]>(() => {
        const storedFilters = sessionStorage.getItem(FILTER_STORAGE_KEY);

        if (!storedFilters) {
            return [];
        }

        try {
            return JSON.parse(storedFilters);
        } catch {
            return [];
        }
    });

    useEffect(() => {
        if (filters.length === 0) {
            sessionStorage.removeItem(FILTER_STORAGE_KEY);
            return;
        }

        sessionStorage.setItem(
            FILTER_STORAGE_KEY,
            JSON.stringify(filters)
        );
    }, [filters]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const data = await getAllParticipants();
                setParticipants(data);
            } catch (error) {
                toast.error('Failed to load participants');
                console.error(error);
            }
        };

        fetchParticipants();
    }, []);

    const filteredParticipants = filterParticipants(participants, filters);

    return (
        <section className="content-page applications-page">
            <div className="content-card applications-card">
                <div className="applications-heading">
                    <h1>Applications</h1>
                    <p>{filteredParticipants.length} of {participants.length} participants</p>
                </div>
                
                <ApplicationsFilter
                    filters={filters}
                    setFilters={setFilters}
                />

                <ApplicationsTable participants={filteredParticipants} />

            </div>
        </section>
    );
};

export default Applications;