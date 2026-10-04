import './styles/applicantInfo.css';

import type { Person } from '../../../types/person';

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
                <h2>
                    {applicant.firstName} {applicant.lastName}
                </h2>

                <p>This participant has not submitted an application.</p>
            </div>
        );
    }

    const displayValue = (
        value: string | number | null | undefined
    ) => {
        if (
            value === null ||
            value === undefined ||
            value === ''
        ) {
            return 'Not provided';
        }

        return value;
    };

    const displayBoolean = (
        value: boolean | null | undefined
    ) => {
        if (value === true) {
            return 'Yes';
        }

        if (value === false) {
            return 'No';
        }

        return 'Not provided';
    };

    const displayArray = (values: string[]) => {
        return values.length > 0
            ? values.join(', ')
            : 'None selected';
    };

    return (
        <>
            <div className="applicant-header">
                <div>
                    <p className="applicant-label">
                        Applicant
                    </p>

                    <h1>
                        {applicant.firstName} {applicant.lastName}
                    </h1>

                    <p className="applicant-email">
                        {applicant.email}
                    </p>
                </div>

                <div className="applicant-status">
                    <span>Application Status</span>

                    <strong>
                        {applicant.applicationDecision}
                    </strong>
                </div>
            </div>

            <section className="applicant-section">
                <h2>Personal Information</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Email"
                        value={application.email}
                    />

                    <Info
                        label="Phone"
                        value={displayValue(application.phone)}
                    />

                    <Info
                        label="Age"
                        value={displayValue(application.age)}
                    />

                    <Info
                        label="Gender"
                        value={displayValue(application.gender)}
                    />

                    <Info
                        label="Pronouns"
                        value={displayValue(application.pronouns)}
                    />

                    <Info
                        label="Country"
                        value={displayValue(application.country)}
                    />

                    <Info
                        label="Race / Ethnicity"
                        value={displayArray(
                            application.raceEthnicity
                        )}
                    />

                    <Info
                        label="Sexual Orientation"
                        value={displayArray(
                            application.sexualOrientation
                        )}
                    />

                    <Info
                        label="Shirt Size"
                        value={displayValue(application.shirtSize)}
                    />
                </div>
            </section>

            <section className="applicant-section">
                <h2>Education</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="University"
                        value={displayValue(application.university)}
                    />

                    <Info
                        label="Major"
                        value={displayValue(application.major)}
                    />

                    <Info
                        label="Graduation Year"
                        value={displayValue(
                            application.graduationYear
                        )}
                    />

                    <Info
                        label="Education Level"
                        value={displayValue(
                            application.educationLevel
                        )}
                    />
                </div>
            </section>

            <section className="applicant-section">
                <h2>Online Profiles</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="LinkedIn"
                        value={displayValue(application.linkedin)}
                    />

                    <Info
                        label="GitHub"
                        value={displayValue(application.github)}
                    />

                    <Info
                        label="Portfolio"
                        value={displayValue(application.portfolio)}
                    />
                </div>
            </section>

            <section className="applicant-section">
                <h2>Hackathon Experience</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Attended a Hackathon Before"
                        value={displayBoolean(
                            application.attendedHackathon
                        )}
                    />

                    <Info
                        label="Number of Hackathons"
                        value={displayValue(
                            application.hackathonCount
                        )}
                    />

                    <Info
                        label="Attended HackUMass Before"
                        value={displayBoolean(
                            application.attendedHackUMass
                        )}
                    />
                </div>

                <LongInfo
                    label="Previous Experience"
                    value={displayValue(
                        application.previousExperience
                    )}
                />
            </section>

            <section className="applicant-section">
                <h2>Skills</h2>

                <LongInfo
                    label="Programming Skills"
                    value={displayValue(
                        application.programmingSkills
                    )}
                />

                <LongInfo
                    label="Hardware Skills"
                    value={displayValue(
                        application.hardwareSkills
                    )}
                />

                <LongInfo
                    label="Other Skills"
                    value={displayValue(
                        application.otherSkills
                    )}
                />

                <div className="applicant-info-grid">
                    <Info
                        label="Has a Team"
                        value={displayBoolean(
                            application.hasTeam
                        )}
                    />
                </div>
            </section>

            <section className="applicant-section">
                <h2>Application Questions</h2>

                <LongInfo
                    label="Why HackUMass?"
                    value={displayValue(
                        application.whyHackUMass
                    )}
                />

                <LongInfo
                    label="What do you hope to get out of HackUMass?"
                    value={displayValue(
                        application.goals
                    )}
                />
            </section>

            <section className="applicant-section">
                <h2>Travel</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Travel Support"
                        value={displayArray(
                            application.travelSupport
                        )}
                    />
                </div>

                <LongInfo
                    label="Travel Details"
                    value={displayValue(
                        application.travelDetails
                    )}
                />
            </section>

            <section className="applicant-section">
                <h2>Food & Event Preferences</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Meal Accommodations"
                        value={displayBoolean(
                            application.mealAccommodations
                        )}
                    />

                    <Info
                        label="Workshop Interest"
                        value={displayBoolean(
                            application.workshopInterest
                        )}
                    />
                </div>

                <LongInfo
                    label="Food Restrictions"
                    value={displayValue(
                        application.foodRestrictions
                    )}
                />

                <LongInfo
                    label="Hardware Requests"
                    value={displayValue(
                        application.hardwareRequests
                    )}
                />

                <LongInfo
                    label="Snack Suggestions"
                    value={displayValue(
                        application.snacks
                    )}
                />

                <LongInfo
                    label="Prize Suggestions"
                    value={displayValue(
                        application.prizes
                    )}
                />

                <LongInfo
                    label="Song Suggestion"
                    value={displayValue(
                        application.song
                    )}
                />
            </section>

            <section className="applicant-section">
                <h2>Additional Information</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Referral Source"
                        value={displayArray(
                            application.referralSource
                        )}
                    />

                    <Info
                        label="Underrepresented in Tech"
                        value={displayValue(
                            application.underrepresented
                        )}
                    />

                    <Info
                        label="MLH Agreement"
                        value={displayBoolean(
                            application.mlhAgreement
                        )}
                    />

                    <Info
                        label="Liability Waiver"
                        value={displayBoolean(
                            application.liabilityWaiver
                        )}
                    />

                    <Info
                        label="MLH Communication"
                        value={displayBoolean(
                            application.mlhCommunication
                        )}
                    />
                </div>
            </section>

            <section className="applicant-section applicant-metadata">
                <h2>Application Information</h2>

                <div className="applicant-info-grid">
                    <Info
                        label="Last Modified"
                        value={
                            application.lastModified
                                ? new Date(
                                    application.lastModified
                                ).toLocaleString()
                                : 'Not available'
                        }
                    />

                    <Info
                        label="RSVP Status"
                        value={applicant.rsvpStatus}
                    />
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