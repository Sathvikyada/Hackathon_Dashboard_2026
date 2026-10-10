import './styles/applicantInfo.css';

import type { Person } from '../../../types/person';
import type { ApplicationAnswer } from '../../../types/Application';
import { APPLICATION_CONFIG } from '../../../../data/application_configuration';

interface ApplicantInfoProps {
    applicant: Person;
}

interface InfoProps {
    label: string;
    value: React.ReactNode;
}

const ApplicantInfo = ({ applicant }: ApplicantInfoProps) => {
    const application = applicant.application;

    if (!application) {
        return (
            <div className="applicant-info-empty">
                <h2>{applicant.firstName} {applicant.lastName}</h2>

                <p>
                    This participant has not submitted an application.
                </p>
            </div>
        );
    }

    const displayValue = (value: ApplicationAnswer | undefined) => {
        if (value === null || value === undefined || value === '') {
            return 'Not provided';
        }

        if (Array.isArray(value)) {
            return value.length > 0 ? value.join(', ') : 'None selected';
        }

        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        if (value instanceof File) {
            return value.name;
        }

        return String(value);
    };

    return (
        <>
            <div className="applicant-header">
                <div>
                    <p className="applicant-label">Applicant</p>
                    <h1>{applicant.firstName} {applicant.lastName}</h1>
                    <p className="applicant-email">{applicant.email}</p>
                </div>

                <div className="applicant-status">
                    <span>Application Status</span>

                    <strong>
                        {applicant.applicationDecision}
                    </strong>

                    {(applicant.applicationDecisionLastModified ||
                        applicant.applicationDecisionModifiedBy) && (
                        <div className="applicant-status-details">
                            {applicant.applicationDecisionLastModified && (
                                <div className="applicant-status-metadata">
                                    <span>Last Modified</span>
                                    <p>
                                        {new Date(
                                            applicant.applicationDecisionLastModified
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {applicant.applicationDecisionModifiedBy && (
                                <div className="applicant-status-metadata">
                                    <span>Modified By</span>
                                    <p>{applicant.applicationDecisionModifiedByName}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {APPLICATION_CONFIG.map(section => (
                <section className="applicant-section" key={section.label}>
                    <h2>{section.label}</h2>

                    <div className="applicant-info-grid">
                        {section.fields.map(field => {
                            const value = application.answers[field.id];

                            if (field.type === 'longText') {
                                return (
                                    <LongInfo key={field.id} label={field.label} value={displayValue(value)} />
                                );
                            }

                            return (
                                <Info key={field.id} label={field.label} value={displayValue(value)} />
                            );
                        })}
                    </div>
                </section>
            ))}

            <section className="applicant-section applicant-metadata">
                <h2>
                    Application Information
                </h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Last Modified"
                        value={
                            application.lastModified
                                ? new Date(application.lastModified).toLocaleString()
                                : 'Not available'
                        }
                    />

                    <Info label="RSVP Status" value={applicant.rsvpStatus} />
                </div>
            </section>
        </>
    );
};

const Info = ({ label, value }: InfoProps) => {
    return (
        <div className="applicant-info">
            <span>{label}</span>
            <p>{value}</p>
        </div>
    );
};

const LongInfo = ({ label, value }: InfoProps) => {
    return (
        <div className="applicant-long-info">
            <span>{label}</span>
            <p>{value}</p>
        </div>
    );
};

export default ApplicantInfo;