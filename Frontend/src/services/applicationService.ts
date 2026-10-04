import type { Application, ApplicationAnswer } from '../types/Application';
import type { Person } from '../types/person';
import type { FieldConfig } from '../types/ApplyConfig';

import { APPLICATION_CONFIG } from '../../data/application_configuration';


const DATABASE_API_URL = 'http://localhost:3001/people';


type SubmitApplicationResult =
    | {
        success: true;
        personData: Person;
        error: null;
    }
    | {
        success: false;
        personData: null;
        error: string;
    };


/* ========================================
   Basic Helpers
======================================== */

function getString(
    formData: FormData,
    key: string
): string | null {
    const value = formData.get(key);

    if (value === null) {
        return null;
    }

    if (typeof value !== 'string') {
        throw new Error(`${key} must be text`);
    }

    const normalizedValue = value.trim();

    return normalizedValue === ''
        ? null
        : normalizedValue;
}


function getStringArray(
    formData: FormData,
    key: string
): string[] {
    const values = formData.getAll(key);

    if (
        !values.every(
            (value): value is string =>
                typeof value === 'string'
        )
    ) {
        throw new Error(
            `${key} must contain only text values`
        );
    }

    return values
        .map(value => value.trim())
        .filter(value => value !== '');
}


/* ========================================
   Field Parsers
======================================== */

function parseTextField(
    field: Extract<FieldConfig, { type: 'text' }>,
    formData: FormData
): string | number | null {
    const value = getString(
        formData,
        field.id
    );

    if (value === null) {
        if (field.required) {
            throw new Error(
                `${field.label} is required`
            );
        }

        return null;
    }

    if (field.inputType === 'number') {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            throw new Error(
                `${field.label} must be a valid number`
            );
        }

        return number;
    }

    return value;
}


function parseOptionField(
    field: Extract<
        FieldConfig,
        { type: 'select' | 'radio' }
    >,
    formData: FormData
): string | null {
    const value = getString(
        formData,
        field.id
    );

    if (value === null) {
        if (field.required) {
            throw new Error(
                `${field.label} is required`
            );
        }

        return null;
    }

    if (!field.options.includes(value)) {
        throw new Error(
            `${field.label} contains an invalid option`
        );
    }

    return value;
}


function parseCheckboxField(
    field: Extract<
        FieldConfig,
        { type: 'checkbox' }
    >,
    formData: FormData
): string[] {
    const values = getStringArray(
        formData,
        field.id
    );

    if (
        field.required &&
        values.length === 0
    ) {
        throw new Error(
            `${field.label} is required`
        );
    }

    if (
        !values.every((value) =>
            field.options.includes(value)
        )
    ) {
        throw new Error(
            `${field.label} contains an invalid option`
        );
    }

    return values;
}


function parseLongTextField(
    field: Extract<
        FieldConfig,
        { type: 'longText' }
    >,
    formData: FormData
): string | null {
    const value = getString(
        formData,
        field.id
    );

    if (
        value === null &&
        field.required
    ) {
        throw new Error(
            `${field.label} is required`
        );
    }

    return value;
}


function parseAgreementField(
    field: Extract<
        FieldConfig,
        { type: 'agreement' }
    >,
    formData: FormData
): boolean {
    const value = formData.get(field.id);

    const checked = value === 'true';

    if (
        field.required &&
        !checked
    ) {
        throw new Error(
            `${field.label} must be accepted`
        );
    }

    return checked;
}


/* ========================================
   Generic Field Parser
======================================== */

function parseField(
    field: FieldConfig,
    formData: FormData
): ApplicationAnswer {
    switch (field.type) {
        case 'text':
            return parseTextField(
                field,
                formData
            );

        case 'select':
        case 'radio':
            return parseOptionField(
                field,
                formData
            );

        case 'checkbox':
            return parseCheckboxField(
                field,
                formData
            );

        case 'longText':
            return parseLongTextField(
                field,
                formData
            );

        case 'agreement':
            return parseAgreementField(
                field,
                formData
            );

        case 'file':
            return null;
    }
}


/* ========================================
   Application Parser
======================================== */

function parseApplication(
    formData: FormData
): Application {
    const answers: Record<
        string,
        ApplicationAnswer
    > = {};

    for (const section of APPLICATION_CONFIG) {
        for (const field of section.fields) {
            answers[field.id] = parseField(
                field,
                formData
            );
        }
    }

    return {
        lastModified: new Date().toISOString(),
        answers
    };
}


/* ========================================
   Submit Application
======================================== */

async function submitApplication(
    application: Application,
    userId: Person['id']
): Promise<SubmitApplicationResult> {
    try {
        const response = await fetch(
            `${DATABASE_API_URL}/${userId}`,
            {
                method: 'PATCH',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    applied: true,
                    applicationDecision: 'Pending',
                    application
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                'Failed to submit application'
            );
        }

        const personData: Person =
            await response.json();

        return {
            success: true,
            personData,
            error: null
        };

    } catch (error) {
        console.error(
            'Error submitting application:',
            error
        );

        return {
            success: false,
            personData: null,
            error: 'Failed to submit application'
        };
    }
}


/* ========================================
   Handle Submit
======================================== */

async function handleSubmit(
    formData: FormData,
    userId: Person['id']
): Promise<SubmitApplicationResult> {
    try {
        const application =
            parseApplication(formData);

        return await submitApplication(
            application,
            userId
        );

    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Invalid application data';

        console.error(
            'Error validating application:',
            error
        );

        return {
            success: false,
            personData: null,
            error: message
        };
    }
}


export { handleSubmit };