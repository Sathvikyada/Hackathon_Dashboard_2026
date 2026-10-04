interface CheckboxFieldProps {
    label: string;
    required: boolean;
    description?: string;
    id: string;
    options: string[];
    values?: string[];
    width: 'half' | 'full';
}

const CheckboxField = ({ label, required, description, id, options, values, width }: CheckboxFieldProps) => {
    return (
        <div className={`form-group field-${width}`}>
            <label>
                {label}
                {required && ' *'}
            </label>

            {description && (
                <p className="field-help">
                    {description}
                </p>
            )}

            <div className="checkbox-grid">
                {options.map((option) => (
                    <label
                        className="checkbox-option"
                        key={option}
                    >
                        <input
                            type="checkbox"
                            name={id}
                            value={option}
                            defaultChecked={
                                values?.includes(option) ?? false
                            }
                        />

                        {option}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CheckboxField;