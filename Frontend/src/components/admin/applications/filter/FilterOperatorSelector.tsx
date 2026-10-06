import type { ParticipantFilter, FieldValueConfig, FilterOperator } from './filterTypes'

interface FilterOperatorsProps {
    filter: ParticipantFilter;
    updateFilter: (id: string, updates: Partial<ParticipantFilter>) => void;
    valueConfig?: FieldValueConfig;
}

const FilterOperators = ({ filter, updateFilter, valueConfig }: FilterOperatorsProps) => {
    return (
        <select
            value={filter.operator}
            disabled={!valueConfig}
            onChange={event => updateFilter(
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

            {(valueConfig?.type === 'multiple' || valueConfig?.type === 'text') && (
                <option value="contains">
                    Contains
                </option>
            )}
        </select>
    )
}

export default FilterOperators;