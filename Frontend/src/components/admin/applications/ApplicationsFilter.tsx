import { APPLICATION_CONFIG } from '../../../../data/application_configuration';

// Types and interfaces for the filters
type FilterOperator =
    | 'equals'
    | 'notEquals'
    | 'contains';

export interface ParticipantFilter {
    id: string;
    source: 'person' | 'application';
    fieldId: string;
    operator: FilterOperator;
    value: string | string[];
}

// Interface and options for the possible filterable fields
interface FilterFieldOption {
    label: string;
    source: 'person' | 'application';
    fieldId: string;
}

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

// Gather all the filterable fields for applications
const APPLICATION_FILTER_FIELDS =
    APPLICATION_CONFIG.flatMap(section =>
        section.fields
            .filter(field => field.filterable)
            .map(field => ({
                label: field.label,
                source: 'application' as const,
                fieldId: field.id
            }))
    );

const FILTER_FIELDS: FilterFieldOption[] = [
    ...PERSON_FILTER_FIELDS,
    ...APPLICATION_FILTER_FIELDS
];

// The options for the filter can be a single option, multiple options, or a value
type FilterValueConfig =
    | {
        type: 'single';
        options: string[];
    }
    | {
        type: 'multiple';
        options: string[];
    }
    | {
        type: 'text';
    };

const FILTER_VALUE_CONFIG: Record<string, FilterValueConfig> = {
    // Options for the person-related filters
    applied: {
        type: 'single',
        options: ['Yes', 'No']
    },

    applicationDecision: {
        type: 'single',
        options: [
            'Accepted',
            'Rejected',
            'Pending',
            'Waitlisted',
            'N/A'
        ]
    },

    rsvpStatus: {
        type: 'single',
        options: [
            'Accepted',
            'Declined',
            'Pending',
            'N/A'
        ]
    },

    ...Object.fromEntries(
        APPLICATION_CONFIG.flatMap(section =>
            section.fields
                .filter(field => field.filterable)
                .map(field => {
                    if (
                        field.type === 'select' ||
                        field.type === 'radio'
                    ) {
                        return [
                            field.id,
                            {
                                type: 'single',
                                options: field.options
                            }
                        ];
                    }

                    if (field.type === 'checkbox') {
                        return [
                            field.id,
                            {
                                type: 'multiple',
                                options: field.options
                            }
                        ];
                    }

                    return [
                        field.id,
                        {
                            type: 'text'
                        }
                    ];
                })
        )
    )
};

interface ParticipantFiltersProps {
    filters: ParticipantFilter[];
    setFilters: React.Dispatch<
        React.SetStateAction<ParticipantFilter[]>
    >;
}

const ParticipantFilters = ({ filters, setFilters }: ParticipantFiltersProps) => {

    const addFilter = () => {
        setFilters(currentFilters => [
            ...currentFilters,
            {
                // This is the default filter that gets displayed when adding a new filter
                id: crypto.randomUUID(),
                source: 'person',
                fieldId: '',
                operator: 'equals',
                value: ''
            }
        ]);
    };

    const removeFilter = (id: string) => {
        setFilters(currentFilters =>
            currentFilters.filter(
                filter => filter.id !== id
            )
        );
    };

    const updateFilter = (
        id: string,
        updates: Partial<ParticipantFilter>
    ) => {
        setFilters(currentFilters =>
            currentFilters.map(filter =>
                filter.id === id
                    ? {
                        ...filter,
                        ...updates
                    }
                    : filter
            )
        );
    };

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

    const clearFilters = () => {
        setFilters([]);
    };

    return (
        <div className="participant-filters">
            <div className="participant-filters-header">
                <h2>Filters</h2>

                <div className="participant-filters-actions">
                    {filters.length > 0 && (
                        <button
                            type="button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={addFilter}
                    >
                        + Add Filter
                    </button>
                </div>
            </div>

            {filters.length === 0 ? (
                <p className="participant-filters-empty">
                    No filters applied.
                </p>
            ) : (
                <div className="participant-filter-list">
                    {filters.map(filter => {
                        const valueConfig = FILTER_VALUE_CONFIG[filter.fieldId];

                        return (
                            <div className="participant-filter-row" key={filter.id}>

                                {/* These are the field options for the filter. */}
                                <select value={
                                    filter.fieldId === ''
                                    ? ''
                                    : `${filter.source}:${filter.fieldId}`}
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

                                {/* These are the operator options */}
                                <select
                                value={filter.operator}
                                disabled={!valueConfig}
                                onChange={event => 
                                    updateFilter(
                                        filter.id,
                                        {operator:event.target.value as FilterOperator}
                                    )}
                                >

                                    <option value="equals">
                                        Equals
                                    </option>

                                    <option value="notEquals">
                                        Does Not Equal
                                    </option>

                                    {(valueConfig?.type === 'multiple' ||
                                    valueConfig?.type === 'text') && (
                                        <option value="contains">
                                            Contains
                                        </option>
                                    )}
                                </select>

                                {/* These are the value options for the filter rendered based on the application configuration. */}
                                {valueConfig?.type === 'single' && (
                                    <select value={
                                        typeof filter.value === 'string'
                                        ? filter.value
                                        : ''
                                    } onChange={event => updateFilter(
                                        filter.id,
                                        {value: event.target.value}
                                    )}
                                    >

                                        <option value="">
                                            Select value
                                        </option>

                                        {valueConfig.options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {valueConfig?.type === 'multiple' && (
                                    <select multiple value={
                                            Array.isArray(filter.value)
                                            ? filter.value
                                            : []
                                        } onChange={event => {
                                            const selectedValues =
                                            Array.from(
                                                event.target.selectedOptions,
                                                option => option.value
                                            );

                                            updateFilter(filter.id, {value: selectedValues});
                                        }}
                                    >
                                        {valueConfig.options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {valueConfig?.type === 'text' && (
                                    <input
                                        type="text" value={
                                            typeof filter.value === 'string'
                                            ? filter.value
                                            : ''
                                        } 
                                        placeholder="Value"
                                        onChange={event =>
                                            updateFilter(filter.id, {value: event.target.value})
                                        }
                                    />
                                )}

                                {!valueConfig && (
                                    <input
                                        type="text"
                                        placeholder="Select a field first"
                                        disabled
                                    />
                                )}

                                <button type="button"
                                    onClick={() =>
                                        removeFilter(filter.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        )
                    }
                )}
                </div>
            )}
        </div>
    );
};

export default ParticipantFilters;