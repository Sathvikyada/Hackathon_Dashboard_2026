import { APPLICATION_CONFIG } from '../../../../../data/application_configuration';
import type { FieldValueConfig } from './filterTypes';

// The options for the filter can be a single option, multiple options, or a value
const FIELD_VALUE_CONFIG: Record<string, FieldValueConfig> = {
    // Options for the person-related filters
    applied: {
        type: 'single',
        options: ['Yes', 'No']
    },

    applicationDecision: {
        type: 'single',
        options: [
            'Accepted',
            'Rejected',
            'Pending',
            'Waitlisted',
            'N/A'
        ]
    },

    rsvpStatus: {
        type: 'single',
        options: [
            'Accepted',
            'Declined',
            'Pending',
            'N/A'
        ]
    },

    ...Object.fromEntries(
        APPLICATION_CONFIG.flatMap(section =>
            section.fields
                .filter(field => field.filterable)
                .map(field => {
                    if (
                        field.type === 'select' ||
                        field.type === 'radio'
                    ) {
                        return [
                            field.id,
                            {
                                type: 'single',
                                options: field.options
                            }
                        ];
                    }

                    if (field.type === 'checkbox') {
                        return [
                            field.id,
                            {
                                type: 'multiple',
                                options: field.options
                            }
                        ];
                    }

                    return [
                        field.id,
                        {
                            type: 'text'
                        }
                    ];
                })
        )
    )
};

export default FIELD_VALUE_CONFIG;