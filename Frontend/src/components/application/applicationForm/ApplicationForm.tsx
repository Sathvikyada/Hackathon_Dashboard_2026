import '../../styles/content.css';
import './styles/applicationForm.css';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import useApplicationDraft from './useApplicationDraft';

import type { SubmitApplicationResult } from '../../../services/applicationService';
import type { Person } from '../../../types/person';
import type { Application } from '../../../types/Application';
import type { ApplicationAnswer } from '../../../types/Application';

import { APPLICATION_CONFIG } from '../../../../data/application_configuration';

import FormSection from '../applicationFields/FormSection';
import RenderApplicationFields from './RenderApplicationFields';
import { serializeForm } from './serializeForm';


interface ApplicationProps {
    user: Person;
    application?: Application;
    submitForm: (formData: FormData, userID: string) => Promise<SubmitApplicationResult>;
    submitText: string;
    draftKey: string;
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

const ApplicationForm = ({user, application, submitForm, submitText, draftKey}: ApplicationProps) => {
    // Collect all the form validation errors to display at bottom at form
    const [errors, setErrors] = useState<string[]>([]);
    // Initialize the custom hook to enable auto-saving and status messages
    const {formRef, draft, clearDraft, saveStatus, markUnsaved} = useApplicationDraft({storageKey: draftKey, intervalMs: 5_000});
    // Store the current values to know when to display the conditional fields
    const [currentValues, setCurrentValues] =
        useState<Record<string, ApplicationAnswer>>(
            () => ({
                ...application?.answers,
                ...draft
            })
        );
    
    // Mark form as unsaved to trigger sessionStorage saving in custom hook
    const handleFormChange = () => {
        // Mark the form as unsaved when any change occurs
        markUnsaved();

        if (!formRef.current) {
            return;
        }

        // Update the current values to know when to display hidden fields
        setCurrentValues(serializeForm(formRef.current));
    };

    const handleFormSubmit = async (formData: FormData) => {
        setErrors([]);
        const result = await submitForm(formData, user.id);

        if (!result.success) {
            setErrors(result.errors);
            return;
        }

        clearDraft();
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
                    ref={formRef}
                    className="application-form"
                    action={handleFormSubmit}
                    onChange={handleFormChange}
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

                            {section.fields.map((field) => (
                                <RenderApplicationFields
                                    key={field.id}
                                    field={field}
                                    currentValues={currentValues}
                                />
                            ))}
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
                        <span
                            className={
                                saveStatus === 'error'
                                    ? 'draft-status draft-status-error'
                                    : 'draft-status'
                            }
                        >
                            {saveStatus === 'saved' && 'Draft Saved'}
                            {saveStatus === 'error' && 'Unable to save draft'}
                        </span>

                        <SubmitButton submitText={submitText} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ApplicationForm;