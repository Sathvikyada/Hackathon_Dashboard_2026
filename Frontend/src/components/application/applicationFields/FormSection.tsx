interface FormSectionProps {
    label: string;
    children: React.ReactNode;
}

const FormSection = ({ label, children }: FormSectionProps) => {
    return (
        <fieldset className="form-section">
            <legend>{label}</legend>

            {children}
        </fieldset>
    )
}

export default FormSection;