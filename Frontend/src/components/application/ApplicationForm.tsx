import '../styles/content.css';
import './styles/application.css';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import type { SubmitApplicationResult } from '../../services/applicationService';
import type { Person } from '../../types/person';
import type { FieldConfig } from '../../types/ApplyConfig';
import type { Application } from '../../types/Application';

import { APPLICATION_CONFIG } from '../../../data/application_configuration';

import FormSection from './applicationFields/FormSection';
import TextField from './applicationFields/TextField';
import SelectField from './applicationFields/SelectField';
import LongTextField from './applicationFields/LongTextField';
import RadioField from './applicationFields/RadioField';
import CheckboxField from './applicationFields/CheckboxField';
import FileField from './applicationFields/FileField';
import AgreementField from './applicationFields/AgreementField';


interface ApplicationProps {
    user: Person;
    application?: Application;
    submitForm: (
        formData: FormData,
        userID: string
    ) => Promise<SubmitApplicationResult>;
    submitText: string;
}

interface SubmitButtonProps {
    submitText: string;
}


const SubmitButton = ({ submitText }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : submitText}
        </button>
    );
};

const ApplicationForm = ({
    user,
    application,
    submitForm,
    submitText
}: ApplicationProps) => {
    const [errors, setErrors] = useState<string[]>([]);

    const handleFormAction = async (formData: FormData) => {
        setErrors([]);
        const result = await submitForm(formData, user.id);

        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        setErrors([]);
    };
    
    const renderField = (field: FieldConfig) => {
        const value = application?.answers[field.id];

        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        type={field.inputType}
                        width={field.width}
                        value={
                            typeof value === 'string' ||
                            typeof value === 'number'
                                ? String(value)
                                : undefined
                        }
                        min={field.min}
                        max={field.max}
                        maxLength={field.maxLength}
                    />
                );

            case 'select':
                return (
                    <SelectField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        options={field.options}
                        width={field.width}
                        value={
                            typeof value === 'string'
                                ? value
                                : undefined
                        }
                    />
                );

            case 'longText':
                return (
                    <LongTextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        description={field.description}
                        rows={field.rows}
                        value={
                            typeof value === 'string'
                                ? value
                                : undefined
                        }
                        maxLength={field.maxLength}
                        maxWords={field.maxWords}
                    />
                );

            case 'radio':
                return (
                    <RadioField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        options={field.options}
                        width={field.width}
                        value={
                            typeof value === 'string'
                                ? value
                                : undefined
                        }
                    />
                );

            case 'checkbox':
                return (
                    <CheckboxField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        description={field.description}
                        options={field.options}
                        width={field.width}
                        values={
                            Array.isArray(value)
                                ? value
                                : undefined
                        }
                    />
                );

            case 'file':
                return (
                    <FileField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        description={field.description}
                        accept={field.accept}
                        width={field.width}
                    />
                );

            case 'agreement':
                return (
                    <AgreementField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        required={field.required}
                        width={field.width}
                        value={
                            typeof value === 'boolean'
                                ? value
                                : undefined
                        }
                    />
                );
        }
    };

    return (
        <section className="content-page">
            <div className="content-card apply-card">
                <h1>HackUMass Application</h1>

                <p className="apply-intro">
                    Hello {user.firstName},
                    <br />
                    <br />
                    Please complete the application below. Fields marked with
                    an asterisk (*) are required.
                    <br />
                    <br />
                    To modify your name or email information please do so in
                    your profile settings.
                </p>

                <form
                    className="application-form"
                    action={handleFormAction}
                    noValidate
                > 
                    {APPLICATION_CONFIG.map((section) => (
                        <FormSection
                            key={section.label}
                            label={section.label}
                        >
                            {section.label === 'Personal Information' && (
                                <>
                                    <div className="form-group field-half">
                                        <label htmlFor="email">
                                            Email Address *
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group field-half">
                                        <label htmlFor="firstName">
                                            First Name *
                                        </label>

                                        <input
                                            id="firstName"
                                            type="text"
                                            value={user.firstName}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group field-half">
                                        <label htmlFor="lastName">
                                            Last Name *
                                        </label>

                                        <input
                                            id="lastName"
                                            type="text"
                                            value={user.lastName}
                                            readOnly
                                        />
                                    </div>
                                </>
                            )}

                            {section.fields.map(renderField)}
                        </FormSection>
                    ))}
                    {errors.length > 0 && (
                        <div
                            className="application-errors"
                            role="alert"
                        >
                            <p>
                                Please fix the following before submitting:
                            </p>

                            <ul>
                                {errors.map((error, index) => (
                                    <li key={`${error}-${index}`}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="application-submit">
                        <SubmitButton submitText={submitText} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ApplicationForm;