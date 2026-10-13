import { APPLICATION_CONFIG } from '../../../../data/application_configuration'
import type { Person } from '../../../types/person';
import type { ApplicationAnswer } from '../../../types/Application';

const formatAnswer = (value: ApplicationAnswer | undefined) => {
    if (value === undefined || value === null) {
        return '';
    }

    if (Array.isArray(value)) {
        return value.join('; ');
    }

    if (value instanceof File) {
        return value.name;
    }

    return String(value);
};

const escapeCSV = (value: string) => {
    return `"${value.replace(/"/g, '""')}"`;
};

export const exportParticipantsToCSV = (participants: Person[]) => {
    const applicationFields =
        APPLICATION_CONFIG.flatMap((section) =>
            section.fields
        );

    const headers = [
        'First Name',
        'Last Name',
        'Email',
        'Applied',
        'Decision',
        'RSVP Status',
        'Last Modified',
        ...applicationFields.map((field) => field.label)
    ];

    const rows = participants.map((participant) => [
        participant.firstName,
        participant.lastName,
        participant.email,
        participant.applied ? 'Yes' : 'No',
        participant.applicationDecision,
        participant.rsvpStatus,
        participant.application?.lastModified ?? '',

        ...applicationFields.map((field) =>
            formatAnswer(
                participant.application?.answers[field.id]
            )
        )
    ]);

    const csv = [headers, ...rows]
        .map((row) =>
            row.map((value) => escapeCSV(String(value)))
            .join(',')
        )
        .join('\n');

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'applications.csv';

    link.click();
    URL.revokeObjectURL(url);
};