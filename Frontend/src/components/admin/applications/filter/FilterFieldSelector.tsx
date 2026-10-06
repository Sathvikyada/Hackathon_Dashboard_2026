import { APPLICATION_CONFIG } from '../../../../../data/application_configuration';
import type { ParticipantFilter } from './filterTypes'

// Interface and options for the possible filterable fields
interface FilterFieldOption {
    label: string;
    source: 'person' | 'application';
    fieldId: string;
}

// Populate the standard filter fields for participants
const PERSON_FILTER_FIELDS: FilterFieldOption[] = [
    {
        label: 'Applied',
        source: 'person',
        fieldId: 'applied'
    },
    {
        label: 'Application Decision',
        source: 'person',
        fieldId: 'applicationDecision'
    },
    {
        label: 'RSVP Status',
        source: 'person',
        fieldId: 'rsvpStatus'
    }
];

// Gather all the filterable fields from the custom applications
const APPLICATION_FILTER_FIELDS: FilterFieldOption[] =
    APPLICATION_CONFIG.flatMap(section =>
        section.fields
            .filter(field => field.filterable)
            .map(field => ({
                label: field.label,
                source: 'application' as const,
                fieldId: field.id
            }))
    );

// Combine all filter fields into a single array
const FILTER_FIELDS = [...PERSON_FILTER_FIELDS, ...APPLICATION_FILTER_FIELDS];

interface FilterFieldOptionsProps {
    filter: ParticipantFilter;
    updateFilter: (id: string, updates: Partial<ParticipantFilter>) => void;
}

const FilterFieldOptions = ({filter, updateFilter}: FilterFieldOptionsProps) => {

    const handleFieldChange = (filterId: string, selectedValue: string) => {
        if (selectedValue === '') {
            updateFilter(filterId, {
                source: 'person',
                fieldId: '',
                operator: 'equals',
                value: ''
            });
            return;
        }

        const field = FILTER_FIELDS.find(
            option =>
                `${option.source}:${option.fieldId}` ===
                selectedValue
        );

        if (!field) {
            return;
        }

        updateFilter(filterId, {
            source: field.source,
            fieldId: field.fieldId,
            operator: 'equals',
            value: ''
        });
    };

    return (
        <select
            value={
                filter.fieldId === '' ? '' : `${filter.source}:${filter.fieldId}`
            }
            onChange={event =>
                handleFieldChange(
                    filter.id,
                    event.target.value
                )
            }>
                    <option value="">
                        Select field
                    </option>

            <optgroup label="Participant">
                {PERSON_FILTER_FIELDS.map(field => (
                    <option
                            key={`${field.source}:${field.fieldId}`}
                            value={`${field.source}:${field.fieldId}`}
                        >
                            {field.label}
                    </option>
                ))}
            </optgroup>

            <optgroup label="Application">
                {APPLICATION_FILTER_FIELDS.map(field => (
                        <option
                            key={`${field.source}:${field.fieldId}`}
                            value={`${field.source}:${field.fieldId}`}
                        >
                            {field.label}
                        </option>
                ))}
            </optgroup>

        </select>
    )
}

export default FilterFieldOptions;