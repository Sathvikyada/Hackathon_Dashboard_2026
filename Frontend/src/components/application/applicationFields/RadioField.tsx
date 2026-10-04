interface RadioFieldProps {
    label: string;
    required: boolean;
    id: string;
    options: string[];
    value?: string;
    width: 'half' | 'full';
}

const RadioField = ({ label, required, id, options, value, width }: RadioFieldProps) => {
    return (
        <div className={`form-group field-${width}`}>
            <label>
                {label}
                {required && ' *'}
            </label>

            <div className="radio-group">
                {options.map(option => (
                    <label key={option}>
                        <input
                            type="radio"
                            name={id}
                            value={option}
                            defaultChecked={value === option}
                            required={required}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioField;