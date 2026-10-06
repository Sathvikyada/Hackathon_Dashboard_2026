import './styles/applicationFilter.css';
import type { ParticipantFilter } from './filterTypes'
import FIELD_VALUE_CONFIG from './fieldValueConfig';

import FilterFieldSelector from './FilterFieldSelector';
import FilterOperatorSelector from './FilterOperatorSelector';
import FilterValueSelector from './FilterValueSelector';

interface ParticipantFiltersProps {
    filters: ParticipantFilter[];
    setFilters: React.Dispatch<
        React.SetStateAction<ParticipantFilter[]>
    >;
}

const ApplicationsFilter = ({ filters, setFilters }: ParticipantFiltersProps) => {

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

    const clearFilters = () => {
        setFilters([]);
    };

    return (
        <div className="participant-filters">
            <div className="participant-filters-header">
                <h2>Filters</h2>

                <div className="participant-filters-actions">
                    {filters.length > 0 && (
                        <button type="button" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    )}

                    <button type="button" onClick={addFilter}>
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
                        const valueConfig = FIELD_VALUE_CONFIG[filter.fieldId];

                        return (
                            <div className="participant-filter-row" key={filter.id}>

                                {/* These are the field options for the filter. */}
                                <FilterFieldSelector filter={filter} updateFilter={updateFilter} />

                                {/* These are the operator options */}
                                <FilterOperatorSelector filter={filter} updateFilter={updateFilter} valueConfig={valueConfig} />

                                {/* Render the value input for the selected filter field. */}
                                <FilterValueSelector filter={filter} updateFilter={updateFilter} valueConfig={valueConfig} />


                                <button type="button" onClick={() => removeFilter(filter.id)}>
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

export default ApplicationsFilter;