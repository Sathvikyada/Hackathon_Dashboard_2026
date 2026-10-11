interface TextFieldProps {
    label: string;
    required: boolean;
    id: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'url';
    value?: string;
    width: 'half' | 'full';
    min?: number;
    max?: number;
    maxLength?: number;
}

const TextField = ({ label, required, id, type, value, width, min, max, maxLength }: TextFieldProps) => {
    return (
        <div className={`form-group field-${width}`}>
            <label htmlFor={id}>
                {label}
                {required && ' *'}
            </label>

            <input
                id={id}
                name={id}
                type={type}
                defaultValue={value}
                required={required}
                min={min}
                max={max}
                maxLength={maxLength}
            />
        </div>
    )
}

export default TextField