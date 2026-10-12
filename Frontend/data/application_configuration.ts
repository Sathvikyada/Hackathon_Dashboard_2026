import type { FormSectionConfig } from '../src/types/ApplyConfig';


/* ========================================
   Application Configuration
======================================== */

export const APPLICATION_CONFIG: FormSectionConfig[] = [
    {
        label: 'Personal Information',

        fields: [
            // Email, firstName, and lastName remain hard-coded.

            {
                type: 'text',
                id: 'phone',
                label: 'Phone Number',
                required: true,
                filterable: false,
                inputType: 'tel',
                width: 'half',
                maxLength: 25
            },

            {
                type: 'text',
                id: 'age',
                label: 'Age',
                required: true,
                filterable: false,
                inputType: 'number',
                width: 'half',
                min: 16,
                max: 100
            },

            {
                type: 'select',
                id: 'gender',
                label: 'Gender',
                required: true,
                filterable: true,

                options: [
                    'Woman',
                    'Man',
                    'Non-binary',
                    'Prefer to self-describe',
                    'Prefer not to say'
                ],

                width: 'half'
            },

            {
                type: 'text',
                id: 'pronouns',
                label: 'Pronouns',
                required: false,
                filterable: false,
                inputType: 'text',
                width: 'half',
                maxLength: 40
            },

            {
                type: 'text',
                id: 'country',
                label: 'Country of Residence',
                required: true,
                filterable: true,
                inputType: 'text',
                width: 'half',
                maxLength: 100
            },

            {
                type: 'checkbox',
                id: 'raceEthnicity',
                label: 'Race / Ethnicity',
                required: false,
                filterable: false,

                description:
                    'Optional. Used only for internal reporting and improving diversity and inclusion at HackUMass. Select all that apply.',

                options: [
                    'American Indian or Alaska Native',
                    'Asian',
                    'Black or African American',
                    'Hispanic or Latino/a/x',
                    'Middle Eastern or North African',
                    'Native Hawaiian or Other Pacific Islander',
                    'White',
                    'Multiracial',
                    'Another race or ethnicity',
                    'Prefer not to say'
                ],

                width: 'full'
            },

            {
                type: 'checkbox',
                id: 'sexualOrientation',
                label:
                    'Do you consider yourself to be any of the following?',
                required: false,
                filterable: false,

                description:
                    'Optional. Used only for internal reporting and improving diversity and inclusion at HackUMass. Select all that apply.',

                options: [
                    'Asexual',
                    'Bisexual',
                    'Gay',
                    'Lesbian',
                    'Pansexual',
                    'Queer',
                    'Questioning',
                    'Straight / Heterosexual',
                    'Another sexual orientation',
                    'Prefer not to say'
                ],

                width: 'full'
            }
        ]
    },


    {
        label: 'Online Profiles',

        fields: [
            {
                type: 'text',
                id: 'linkedin',
                label: 'LinkedIn URL',
                required: false,
                filterable: false,
                inputType: 'url',
                width: 'half',
                maxLength: 500
            },

            {
                type: 'text',
                id: 'github',
                label: 'GitHub Profile URL',
                required: false,
                filterable: false,
                inputType: 'url',
                width: 'half',
                maxLength: 500
            },

            {
                type: 'text',
                id: 'portfolio',
                label: 'Portfolio / Other URL',
                required: false,
                filterable: false,
                inputType: 'url',
                width: 'half',
                maxLength: 500
            },

            {
                type: 'select',
                id: 'shirtSize',
                label: 'T-Shirt Size',
                required: true,
                filterable: true,

                options: [
                    'XS',
                    'S',
                    'M',
                    'L',
                    'XL',
                    'XXL',
                    'XXXL'
                ],

                width: 'half'
            }
        ]
    },


    {
        label: 'Education',

        fields: [
            {
                type: 'text',
                id: 'university',
                label: 'University / College',
                required: true,
                filterable: true,
                inputType: 'text',
                width: 'half',
                maxLength: 100
            },

            {
                type: 'text',
                id: 'major',
                label: 'Major / Field of Study',
                required: true,
                filterable: true,
                inputType: 'text',
                width: 'half',
                maxLength: 100
            },
            {
                type: 'select',
                id: 'graduationYear',
                label: 'Graduation Year',
                required: true,
                filterable: true,
                options: [
                    '2027',
                    '2028',
                    '2029',
                    '2030',
                    '2031',
                    '2032',
                    '2033',
                    '2034',
                    '2035'
                ],
                width: 'half'
            },
            {
                type: 'radio',
                id: 'educationLevel',
                label: 'Education Level',
                required: true,
                filterable: true,

                options: [
                    'Undergraduate Student',
                    'Graduate Student'
                ],

                width: 'half'
            }
        ]
    },


    {
        label: 'Hackathon Experience',

        fields: [
            {
                type: 'radio',
                id: 'attendedHackathon',
                label: 'Have you attended a hackathon before?',
                required: true,
                filterable: true,

                options: [
                    'Yes',
                    'No'
                ],

                width: 'half'
            },
            {
                type: 'text',
                id: 'hackathonCount',
                label:
                    'If yes, how many hackathons have you attended?',
                required: false,
                filterable: false,
                inputType: 'number',
                width: 'half',
                min: 0,
                max: 100,

                dependencies: [
                    {
                        fieldId: 'attendedHackathon',
                        value: 'Yes'
                    }
                ]
            },
            {
                type: 'radio',
                id: 'attendedHackUMass',
                label: 'Have you attended HackUMass before?',
                required: true,
                filterable: true,

                options: [
                    'Yes',
                    'No'
                ],

                width: 'half'
            },
            {
                type: 'longText',
                id: 'previousExperience',
                label:
                    'If yes, what did you think of your experience?',
                required: false,
                filterable: false,
                rows: 4,
                maxLength: 400,

                dependencies: [
                    {
                        fieldId: 'attendedHackUMass',
                        value: 'Yes'
                    }
                ]
            }
        ]
    },


    {
        label: 'Skills',
        fields: [
            {
                type: 'longText',
                id: 'programmingSkills',
                label: 'What programming skills do you have?',
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400
            },

            {
                type: 'longText',
                id: 'hardwareSkills',
                label: 'What hardware skills do you have?',
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400
            },

            {
                type: 'longText',
                id: 'otherSkills',
                label: 'What other skills do you have?',
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400
            },

            {
                type: 'radio',
                id: 'hasTeam',
                label: 'Do you already have a team?',
                required: true,
                filterable: true,

                options: [
                    'Yes',
                    'No'
                ],

                width: 'half'
            }
        ]
    },


    {
        label: 'Application Questions',

        fields: [
            {
                type: 'longText',
                id: 'whyHackUMass',
                label: 'Why do you want to attend HackUMass?',
                required: true,
                filterable: false,
                description: 'Maximum 200 words.',
                rows: 6,
                maxWords: 200
            },

            {
                type: 'longText',
                id: 'goals',
                label:
                    'What do you hope to get out of your HackUMass experience?',
                required: true,
                filterable: false,
                description: 'Maximum 200 words.',
                rows: 6,
                maxWords: 200
            }
        ]
    },


    {
        label: 'Travel',

        fields: [
            {
                type: 'checkbox',
                id: 'travelSupport',
                label: 'Which travel support options work for you?',
                required: false,
                filterable: true,

                description:
                    'Select all that apply.',

                options: [
                    'I do not need a travel stipend',
                    'I can take a HackUMass Charter Bus from Boston',
                    'I can take a HackUMass Charter Bus from New York City',
                    'I need a travel stipend'
                ],

                width: 'full'
            },
            {
                type: 'longText',
                id: 'travelDetails',
                label:
                    'Where would you be traveling from and what is your estimated cost of travel?',
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400,

                dependencies: [
                    {
                        fieldId: 'travelSupport',
                        value: 'I need a travel stipend'
                    }
                ]
            }
        ]
    },


    {
        label: 'Food & Event Preferences',

        fields: [
            {
                type: 'radio',
                id: 'mealAccommodations',
                label: 'Do you require meal accommodations?',
                required: true,
                filterable: true,

                options: [
                    'No',
                    'Yes'
                ],

                width: 'full'
            },
            {
                type: 'longText',
                id: 'foodRestrictions',
                label: 'Food preferences / restrictions',
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400,

                dependencies: [
                    {
                        fieldId: 'mealAccommodations',
                        value: 'Yes'
                    }
                ]
            },
            {
                type: 'longText',
                id: 'hardwareRequests',
                label: "Hardware you'd like us to provide",
                required: false,
                filterable: false,
                rows: 3,
                maxLength: 400
            },
            {
                type: 'text',
                id: 'snacks',
                label: "Snacks you'd like us to provide",
                required: false,
                filterable: false,
                inputType: 'text',
                width: 'half',
                maxLength: 200
            },
            {
                type: 'text',
                id: 'prizes',
                label: 'Prize suggestions',
                required: false,
                filterable: false,
                inputType: 'text',
                width: 'half',
                maxLength: 200
            },
            {
                type: 'text',
                id: 'song',
                label: 'Song recommendation for our playlist!',
                required: false,
                filterable: false,
                inputType: 'text',
                width: 'half',
                maxLength: 200
            }
        ]
    },


    {
        label: 'How You Heard About Us',

        fields: [
            {
                type: 'checkbox',
                id: 'referralSource',
                label: 'How did you hear about HackUMass?',
                required: false,
                filterable: true,

                description:
                    'Select all that apply.',

                options: [
                    'Friend / Classmate',
                    'University / Professor',
                    'Student Organization',
                    'HackUMass Email',
                    'MLH',
                    'Instagram',
                    'LinkedIn',
                    'Discord',
                    'Other Social Media',
                    'Search Engine',
                    'Previous HackUMass Event',
                    'Other'
                ],

                width: 'full'
            }
        ]
    },


    {
        label: 'Resume',

        fields: [
            {
                type: 'file',
                id: 'resume',
                label: 'Upload Your Resume',
                required: false,
                filterable: false,
                description: 'Upload your resume as a PDF.',
                accept: '.pdf,application/pdf',
                width: 'full'
            }
        ]
    },


    {
        label: 'Agreements',

        fields: [
            {
                type: 'agreement',
                id: 'liabilityWaiver',
                label: 'I agree to the Liability Waiver',
                required: true,
                filterable: false,
                width: 'full'
            },

            {
                type: 'agreement',
                id: 'mlhAgreement',
                label:
                    'I agree to the MLH Terms and Conditions',
                required: true,
                filterable: false,
                width: 'full'
            }
        ]
    },


    {
        label: 'Additional Information',

        fields: [
            {
                type: 'radio',
                id: 'underrepresented',
                label:
                    'Do you identify as part of an underrepresented group in the technology industry?',
                required: false,
                filterable: true,

                options: [
                    'Yes',
                    'No',
                    'Not Sure'
                ],

                width: 'full'
            },

            {
                type: 'radio',
                id: 'workshopInterest',
                label:
                    'Are you interested in hosting a workshop?',
                required: false,
                filterable: true,

                options: [
                    'Yes',
                    'No'
                ],

                width: 'half'
            }
        ]
    }
];