interface FileFieldProps {
    label: string;
    required: boolean;
    description?: string;
    id: string;
    accept: string;
    width: 'half' | 'full';
}

const FileField = ({ label, required, description, id, accept, width }: FileFieldProps) => {
    return (
        <div className={`form-group field-${width}`}>
            <label htmlFor={id}>
                {label}
                {required && ' *'}
            </label>

            {description && (
                <p className="field-help">
                    {description}
                </p>
            )}

            <input
                id={id}
                name={id}
                type="file"
                accept={accept}
                required={required}
            />
        </div>
    )
}

export default FileField;