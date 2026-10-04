import '../../styles/content.css'
import './styles/applications.css';

import type { Person } from '../../../types/person';
import { getAllParticipants } from '../../../services/adminApplicationService';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Applications = () => {
    const [participants, setParticipants] = useState<Person[]>([]);
    const navigate = useNavigate();

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

    const getDecisionClass = (status: Person['applicationDecision']) => {
        switch (status) {
            case 'Accepted':
                return 'accepted';
            case 'Rejected':
                return 'rejected';
            case 'Pending':
                return 'pending';
            case 'Waitlisted':
                return 'waitlisted';
            case 'N/A':
                return 'decision-na';
        }
    };

    const getRSVPClass = (status: Person['rsvpStatus']) => {
        switch (status) {
            case 'Accepted':
                return 'rsvp-accepted';
            case 'Declined':
                return 'rsvp-declined';
            case 'Pending':
                return 'rsvp-pending';
            case 'N/A':
                return 'rsvp-na';
        }
    };

    return (
        <section className="content-page applications-page">
            <div className="content-card applications-card">
                <div className="applications-heading">
                    <h1>Applications</h1>
                    <p>{participants.length} participants</p>
                </div>

                <div className="applications-table-container">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Applied</th>
                                <th>University</th>
                                <th>Status</th>
                                <th>RSVP Status</th>
                                <th>Last Modified</th>
                            </tr>
                        </thead>

                        <tbody>
                            {participants.map((participant) => (
                                <tr
                                    key={participant.id}
                                    onClick={() =>
                                        navigate(`/applicant/${participant.id}`)
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
                                        {participant.application?.university || 'N/A'}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Applications;