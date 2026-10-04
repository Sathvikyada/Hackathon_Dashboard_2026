interface AgreementFieldProps {
    label: string;
    required: boolean;
    id: string;
    value?: boolean;
    width: 'half' | 'full';
}

const AgreementField = ({
    label,
    required,
    id,
    value,
    width
}: AgreementFieldProps) => {
    return (
        <div className={`form-group field-${width} agreement-group`}>
            <label className="checkbox-option">
                <input
                    type="checkbox"
                    name={id}
                    value="true"
                    defaultChecked={value}
                    required={required}
                />

                {label}
                {required && ' *'}
            </label>
        </div>
    );
};

export default AgreementField;