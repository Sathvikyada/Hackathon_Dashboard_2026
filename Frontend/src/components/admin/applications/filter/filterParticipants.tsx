import type { Person } from '../../../../types/person';
import type { ParticipantFilter } from './filterTypes';

const getParticipantValue = (participant: Person, filter: ParticipantFilter) => {
    if (filter.source === 'person') {
        switch (filter.fieldId) {
            case 'applied':
                return participant.applied ? 'Yes' : 'No';

            case 'applicationDecision':
                return participant.applicationDecision;

            case 'rsvpStatus':
                return participant.rsvpStatus;

            default:
                return undefined;
        }
    }

    return participant.application?.answers[filter.fieldId];
};

const isFilterComplete = (filter: ParticipantFilter) => {
    if (filter.fieldId === '') {
        return false;
    }

    if (Array.isArray(filter.value)) {
        return filter.value.length > 0;
    }

    return filter.value.trim() !== '';
};

const normalizeString = (value: string | number | boolean) => {
    return String(value).trim().toLowerCase();
};

const arraysEqual = (participantValues: string[], filterValues: string[]) => {
    if (participantValues.length !== filterValues.length) {
        return false;
    }

    const normalizedParticipantValues =
        participantValues.map(normalizeString);

    const normalizedFilterValues =
        filterValues.map(normalizeString);

    return normalizedFilterValues.every(value =>
        normalizedParticipantValues.includes(value)
    );
};


const matchesFilter = (participant: Person, filter: ParticipantFilter) => {
    const participantValue = getParticipantValue(participant, filter);

    if (participantValue === undefined || participantValue === null) {
        return false;
    }

    // Multiple-value field
    if (Array.isArray(participantValue) && Array.isArray(filter.value)) {
        const normalizedParticipantValues =
            participantValue.map(normalizeString);

        const normalizedFilterValues =
            filter.value.map(normalizeString);

        switch (filter.operator) {
            case 'equals':
                return arraysEqual(
                    participantValue,
                    filter.value
                );

            case 'notEquals':
                return !arraysEqual(
                    participantValue,
                    filter.value
                );

            case 'contains':
                return normalizedFilterValues.every(value =>
                    normalizedParticipantValues.includes(value)
                );
        }
    }

    // If only one side is an array, they cannot match
    if (Array.isArray(participantValue) || Array.isArray(filter.value)) {
        return false;
    }

    // Files are not filterable
    if (participantValue instanceof File) {
        return false;
    }

    const normalizedParticipantValue = normalizeString(participantValue);

    const normalizedFilterValue = normalizeString(filter.value);

    switch (filter.operator) {
        case 'equals':
            return (
                normalizedParticipantValue ===
                normalizedFilterValue
            );

        case 'notEquals':
            return (
                normalizedParticipantValue !==
                normalizedFilterValue
            );

        case 'contains':
            return normalizedParticipantValue.includes(
                normalizedFilterValue
            );
    }
};


export const filterParticipants = (participants: Person[], filters: ParticipantFilter[]) => {
    const completedFilters = filters.filter(isFilterComplete);

    if (completedFilters.length === 0) {
        return participants;
    }

    return participants.filter(participant =>
        completedFilters.every(filter =>
            matchesFilter(participant, filter)
        )
    );
};