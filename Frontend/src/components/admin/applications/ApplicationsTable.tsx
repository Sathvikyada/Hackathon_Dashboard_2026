import './styles/applicationsTable.css';
import type { Person } from '../../../types/person';
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

const ApplicationsTable = ({ participants }: ApplicationsTableProps) => {
    const navigate = useNavigate();

    const applicantIds = participants.map(p => p.id);

    return (
        <div className="applications-table-container">
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
                    {participants.map((participant) => (
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
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ApplicationsTable;