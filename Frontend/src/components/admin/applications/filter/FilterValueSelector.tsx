import type { ParticipantFilter, FieldValueConfig } from './filterTypes';

interface FilterValueSelectorProps {
    filter: ParticipantFilter;
    updateFilter: (id: string, updates: Partial<ParticipantFilter>) => void;
    valueConfig?: FieldValueConfig;
}


const FilterValueSelector = ({ filter, updateFilter, valueConfig }: FilterValueSelectorProps) => {
    return (
        <>
            {valueConfig?.type === 'single' && (
                <select 
                value={
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
                <input type="text" 
                value={
                    typeof filter.value === 'string'
                    ? filter.value
                    : ''
                } placeholder="Value"
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
        </>
    )
}

export default FilterValueSelector;
