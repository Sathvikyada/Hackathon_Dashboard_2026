import type { Application, ApplicationAnswer } from '../types/Application';
import type { Person } from '../types/person';
import type { FieldConfig } from '../types/ApplyConfig';

import { APPLICATION_CONFIG } from '../../data/application_configuration';


const DATABASE_API_URL = 'http://localhost:3001/people';


export type SubmitApplicationResult =
    | {
        success: true;
        personData: Person;
        errors: [];
    }
    | {
        success: false;
        personData: null;
        errors: string[];
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
   Validation / Normalization Helpers
======================================== */

function countWords(value: string): number {
    const trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
}


function normalizeUrl(value: string): string {
    const trimmed = value.trim();

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    return `https://${trimmed}`;
}


function validateUrl(value: string, label: string): string {
    const normalized = normalizeUrl(value);

    try {
        const url = new URL(normalized);

        if (
            url.protocol !== 'http:' &&
            url.protocol !== 'https:'
        ) {
            throw new Error();
        }

        return url.href;
    } catch {
        throw new Error(
            `${label} must be a valid URL`
        );
    }
}


function normalizePhone(value: string): string {
    return value.trim().replace(/[\s().-]/g, '');
}


function validatePhone( value: string, label: string): string {
    const normalized = normalizePhone(value);

    if (!/^\+?\d{7,15}$/.test(normalized)) {
        throw new Error(
            `${label} must be a valid phone number`
        );
    }

    return normalized;
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

    /* Number */
    if (field.inputType === 'number') {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            throw new Error(
                `${field.label} must be a valid number`
            );
        }

        if (!Number.isInteger(number)) {
            throw new Error(
                `${field.label} must be a whole number`
            );
        }

        if (
            field.min !== undefined &&
            number < field.min
        ) {
            throw new Error(
                `${field.label} must be at least ${field.min}`
            );
        }

        if (
            field.max !== undefined &&
            number > field.max
        ) {
            throw new Error(
                `${field.label} must be at most ${field.max}`
            );
        }

        return number;
    }

    /* URL */
    if (field.inputType === 'url') {
        const normalizedUrl =
            validateUrl(value, field.label);

        if (
            field.maxLength !== undefined &&
            normalizedUrl.length > field.maxLength
        ) {
            throw new Error(
                `${field.label} must be at most ${field.maxLength} characters`
            );
        }

        return normalizedUrl;
    }

    /* Phone */
    if (field.inputType === 'tel') {
        return validatePhone(value, field.label);
    }

    /* Normal text */
    if (
        field.maxLength !== undefined &&
        value.length > field.maxLength
    ) {
        throw new Error(
            `${field.label} must be at most ${field.maxLength} characters`
        );
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
    field: Extract<FieldConfig, { type: 'longText' }>,
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

    if (
        field.maxLength !== undefined &&
        value.length > field.maxLength
    ) {
        throw new Error(
            `${field.label} must be at most ${field.maxLength} characters`
        );
    }

    if (
        field.maxWords !== undefined &&
        countWords(value) > field.maxWords
    ) {
        throw new Error(
            `${field.label} must be at most ${field.maxWords} words`
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

class ApplicationValidationError extends Error {
    errors: string[];

    constructor(errors: string[]) {
        super('Application validation failed');
        this.errors = errors;
    }
}

function parseApplication(
    formData: FormData
): Application {
    const answers: Record<string, ApplicationAnswer> = {};
    const errors: string[] = [];

    for (const section of APPLICATION_CONFIG) {
        for (const field of section.fields) {
            try {
                answers[field.id] = parseField(
                    field,
                    formData
                );
            } catch (error) {
                if (error instanceof Error) {
                    errors.push(error.message);
                } else {
                    errors.push(
                        `${field.label} contains invalid data`
                    );
                }
            }
        }
    }

    if (errors.length > 0) {
        throw new ApplicationValidationError(errors);
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
            errors: []
        };

    } catch (error) {
        console.error(
            'Error submitting application:',
            error
        );

        return {
            success: false,
            personData: null,
            errors: ['Failed to submit application']
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
        if (error instanceof ApplicationValidationError) {
            return {
                success: false,
                personData: null,
                errors: error.errors
            };
        }

        console.error(
            'Error validating application:',
            error
        );

        return {
            success: false,
            personData: null,
            errors: ['Invalid application data']
        };
    }
}

export { handleSubmit };