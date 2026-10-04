interface LongTextFieldProps {
    label: string;
    required: boolean;
    description?: string;
    id: string;
    rows: number;
    value?: string;
}

const LongTextField = ({ label, required, description, id, rows, value }: LongTextFieldProps) => {
    return (
        <div className="form-group long-text-field">
            <label htmlFor={id}>
                {label}
                {required && ' *'}
            </label>

            {description &&
                <p className="field-help">
                    {description}
                </p>
            }

            <textarea
                id={id}
                name={id}
                rows={rows}
                defaultValue={value}
                required={required}
            />
        </div>
    )
};

export default LongTextField;