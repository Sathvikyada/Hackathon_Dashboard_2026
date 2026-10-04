interface TextFieldProps {
    label: string;
    required: boolean;
    id: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'url';
    value?: string;
    width: 'half' | 'full';
}

const TextField = ({ label, required, id, type, value, width }: TextFieldProps) => {
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
            />
        </div>
    )
}

export default TextField