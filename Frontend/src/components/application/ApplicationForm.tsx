import '../styles/content.css';
import './styles/application.css';
import { useFormStatus } from 'react-dom';

import type { Person } from '../../types/person';
import type { Application } from '../../types/Application';
import type { FieldConfig } from '../../types/ApplicationConfig'

import { APPLICATION_CONFIG } from '../../../data/applicationConfig';

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
    submitForm: (formData: FormData, userID: string) => Promise<void>;
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

const ApplicationForm = ({ user, application, submitForm, submitText}: ApplicationProps) => {
    return (
        <section className="content-page">
            <div className="content-card apply-card">
                <h1>HackUMass Application</h1>

                <p className="apply-intro">
                    Hello, {user.firstName},
                    <br />
                    <br />
                    Please complete the application below. Fields marked with
                    an asterisk (*) are required.
                    <br />
                    <br />
                    To modify your name or email information please do so in
                    your profile settings.
                </p>

                <form className="application-form" action={(formData) => submitForm(formData, user.id)}>
                    <fieldset className="form-section">
                        <legend>Personal Information</legend>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address *
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">
                                    First Name *
                                </label>

                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={user.firstName}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">
                                    Last Name *
                                </label>

                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={user.lastName}
                                    readOnly
                                />
                            </div>


                    <div className="application-submit">
                        <SubmitButton submitText={submitText} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ApplicationForm;
