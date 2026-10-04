interface SelectFieldProps {
    label: string;
    required: boolean;
    id: string;
    value?: string;
    options: string[];
    width: 'half' | 'full';
}

const SelectField = ({ label, required, id, value, options, width }: SelectFieldProps) => {
    return (
        <div className={`form-group field-${width}`}>
            <label htmlFor={id}>
                {label}
                {required && ' *'}
            </label>

            <select
                id={id}
                name={id}
                defaultValue={value ?? ''}
                required={required}
            >
                <option value="">
                    Select an option
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField;