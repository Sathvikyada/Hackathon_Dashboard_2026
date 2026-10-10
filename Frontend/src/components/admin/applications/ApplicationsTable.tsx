import './styles/applicationsTable.css';
import type { Person } from '../../../types/person';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApplicationsTableProps {
    participants: Person[];
}

const getDecisionClass = (status: Person['applicationDecision']) => {
    switch (status) {
        case 'Accepted':
            return 'applications-decision-accepted';
        case 'Rejected':
            return 'applications-decision-rejected';
        case 'Pending':
            return 'applications-decision-pending';
        case 'Waitlisted':
            return 'applications-decision-waitlisted';
        case 'N/A':
            return 'applications-decision-na';
    }
};

const getRSVPClass = (status: Person['rsvpStatus']) => {
    switch (status) {
        case 'Accepted':
            return 'applications-rsvp-accepted';
        case 'Declined':
            return 'applications-rsvp-declined';
        case 'Pending':
            return 'applications-rsvp-pending';
        case 'N/A':
            return 'applications-rsvp-na';
    }
};

const SEARCH_STORAGE_KEY = 'applicationSearch';

const ApplicationsTable = ({ participants }: ApplicationsTableProps) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(() => {
        return sessionStorage.getItem(SEARCH_STORAGE_KEY) ?? '';
    });

    useEffect(() => {
        if (!searchQuery.trim()) {
            sessionStorage.removeItem(SEARCH_STORAGE_KEY);
            return;
        }

        sessionStorage.setItem(
            SEARCH_STORAGE_KEY,
            searchQuery
        );
    }, [searchQuery]);  

    const query = searchQuery.trim().toLowerCase();

    const searchedParticipants = participants.filter(participant => {
        if (!query) {
            return true;
        }

        const fullName =
            `${participant.firstName} ${participant.lastName}`.toLowerCase();

        const email = participant.email.toLowerCase();

        return (
            fullName.includes(query) ||
            email.includes(query)
        );
    });

    const applicantIds = searchedParticipants.map(participant => participant.id);

    return (
        <div className="applications-table-container">
            <div className="applications-table-controls">
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by name or email"
                    className="applications-search"
                />

                <span className="applications-table-count">
                    {searchedParticipants.length} result
                    {searchedParticipants.length === 1 ? '' : 's'}
                </span>
            </div>

            <table className="applications-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Applied</th>
                        <th>Status</th>
                        <th>RSVP Status</th>
                        <th>Last Modified</th>
                    </tr>
                </thead>

                <tbody>
                    {searchedParticipants.length > 0 ? (
                        searchedParticipants.map((participant) => (
                            <tr
                                key={participant.id}
                                onClick={() =>
                                    navigate(`/applicant/${participant.id}`, {
                                        state: {applicantIds}
                                    })
                                }
                            >
                                <td>{participant.firstName} {participant.lastName}</td>

                                <td>{participant.email}</td>

                                <td>
                                    <span
                                        className={`status-badge ${
                                            participant.applied
                                                ? 'applied-yes'
                                                : 'applied-no'
                                        }`}
                                    >
                                        {participant.applied ? 'Yes' : 'No'}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status-badge ${getDecisionClass(
                                            participant.applicationDecision
                                        )}`}
                                    >
                                        {participant.applicationDecision}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status-badge ${getRSVPClass(
                                            participant.rsvpStatus
                                        )}`}
                                    >
                                        {participant.rsvpStatus}
                                    </span>
                                </td>

                                <td>
                                    {participant.application?.lastModified
                                        ? new Date(
                                            participant.application.lastModified
                                        ).toLocaleString()
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={6}
                                className="applications-table-empty"
                            >
                                No participants found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationsTable;