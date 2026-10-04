import type { Application } from '../types/Application';
import type { Person } from '../types/person';
import {
    EDUCATION_LEVEL_OPTIONS,
    GENDER_OPTIONS,
    RACE_ETHNICITY_OPTIONS,
    REFERRAL_SOURCE_OPTIONS,
    SEXUAL_ORIENTATION_OPTIONS,
    SHIRT_SIZE_OPTIONS,
    TRAVEL_SUPPORT_OPTIONS,
    UNDERREPRESENTED_OPTIONS
} from '../types/ApplicationEnums';

const DATABASE_API_URL: string = 'http://localhost:3001/people';

type SubmitApplicationResult =
    | { success: true; personData: Person; error: null }
    | { success: false; personData: null; error: string };

function getString(formData: FormData, key: string): string {
    const value = formData.get(key);

    if (typeof value !== 'string') {
        throw new Error(`${key} must be text`);
    }

    return value.trim();
}

function getRequiredString(formData: FormData, key: string): string {
    const value = getString(formData, key);

    if (value === '') {
        throw new Error(`${key} is required`);
    }

    return value;
}

function getOptionalString(formData: FormData, key: string): string | null {
    const value = formData.get(key);

    if (value === null) {
        return null;
    }

    if (typeof value !== 'string') {
        throw new Error(`${key} must be text`);
    }

    const normalizedValue = value.trim();
    return normalizedValue === '' ? null : normalizedValue;
}

function getStringArray(formData: FormData, key: string): string[] {
    const values = formData.getAll(key);

    if (!values.every((value): value is string => typeof value === 'string')) {
        throw new Error(`${key} must contain only text values`);
    }

    return values;
}

function isAllowedValue<const T extends readonly string[]>(
    value: string,
    allowedValues: T
): value is T[number] {
    return allowedValues.some((allowedValue) => allowedValue === value);
}

function getRequiredOption<const T extends readonly string[]>(
    formData: FormData,
    key: string,
    allowedValues: T
): T[number] {
    const value = getRequiredString(formData, key);

    if (!isAllowedValue(value, allowedValues)) {
        throw new Error(`${key} has an invalid value`);
    }

    return value;
}

function getOptionalOption<const T extends readonly string[]>(
    formData: FormData,
    key: string,
    allowedValues: T
): T[number] | null {
    const value = getOptionalString(formData, key);

    if (value === null) {
        return null;
    }

    if (!isAllowedValue(value, allowedValues)) {
        throw new Error(`${key} has an invalid value`);
    }

    return value;
}

function getOptionArray<const T extends readonly string[]>(
    formData: FormData,
    key: string,
    allowedValues: T
): T[number][] {
    const values = getStringArray(formData, key);

    if (!values.every((value): value is T[number] => isAllowedValue(value, allowedValues))) {
        throw new Error(`${key} contains an invalid value`);
    }

    return values;
}

function getRequiredInteger(formData: FormData, key: string): number {
    const value = getRequiredString(formData, key);
    const number = Number(value);

    if (!Number.isSafeInteger(number)) {
        throw new Error(`${key} must be a whole number`);
    }

    return number;
}

function getOptionalInteger(formData: FormData, key: string): number | null {
    const value = getOptionalString(formData, key);

    if (value === null) {
        return null;
    }

    const number = Number(value);

    if (!Number.isSafeInteger(number)) {
        throw new Error(`${key} must be a whole number`);
    }

    return number;
}

function getRequiredBoolean(formData: FormData, key: string): boolean {
    const value = getRequiredString(formData, key);

    if (value === 'yes') {
        return true;
    }

    if (value === 'no') {
        return false;
    }

    throw new Error(`${key} must be yes or no`);
}

function getOptionalBoolean(formData: FormData, key: string): boolean | null {
    const value = formData.get(key);

    if (value === null) {
        return null;
    }

    if (value === 'yes') {
        return true;
    }

    if (value === 'no') {
        return false;
    }

    throw new Error(`${key} must be yes or no`);
}

function requireChecked(formData: FormData, key: string): true {
    if (formData.get(key) !== 'on') {
        throw new Error(`${key} must be accepted`);
    }

    return true;
}

function parseApplication(formData: FormData): Application {
    return {
        lastModified: new Date().toISOString(),
        email: getRequiredString(formData, 'email'),
        firstName: getRequiredString(formData, 'firstName'),
        lastName: getRequiredString(formData, 'lastName'),
        phone: getRequiredString(formData, 'phone'),
        age: getRequiredInteger(formData, 'age'),
        gender: getRequiredOption(formData, 'gender', GENDER_OPTIONS),
        pronouns: getOptionalString(formData, 'pronouns'),
        country: getRequiredString(formData, 'country'),
        raceEthnicity: getOptionArray(formData, 'raceEthnicity', RACE_ETHNICITY_OPTIONS),
        sexualOrientation: getOptionArray(
            formData,
            'sexualOrientation',
            SEXUAL_ORIENTATION_OPTIONS
        ),
        linkedin: getOptionalString(formData, 'linkedin'),
        github: getOptionalString(formData, 'github'),
        portfolio: getOptionalString(formData, 'portfolio'),
        shirtSize: getRequiredOption(formData, 'shirtSize', SHIRT_SIZE_OPTIONS),
        university: getRequiredString(formData, 'university'),
        major: getRequiredString(formData, 'major'),
        graduationYear: getRequiredInteger(formData, 'graduationYear'),
        educationLevel: getRequiredOption(
            formData,
            'educationLevel',
            EDUCATION_LEVEL_OPTIONS
        ),
        attendedHackathon: getRequiredBoolean(formData, 'attendedHackathon'),
        hackathonCount: getOptionalInteger(formData, 'hackathonCount'),
        attendedHackUMass: getRequiredBoolean(formData, 'attendedHackUMass'),
        previousExperience: getOptionalString(formData, 'previousExperience'),
        programmingSkills: getOptionalString(formData, 'programmingSkills'),
        hardwareSkills: getOptionalString(formData, 'hardwareSkills'),
        otherSkills: getOptionalString(formData, 'otherSkills'),
        hasTeam: getRequiredBoolean(formData, 'hasTeam'),
        whyHackUMass: getRequiredString(formData, 'whyHackUMass'),
        goals: getRequiredString(formData, 'goals'),
        travelSupport: getOptionArray(formData, 'travelSupport', TRAVEL_SUPPORT_OPTIONS),
        travelDetails: getOptionalString(formData, 'travelDetails'),
        mealAccommodations: getRequiredBoolean(formData, 'mealAccommodations'),
        foodRestrictions: getOptionalString(formData, 'foodRestrictions'),
        hardwareRequests: getOptionalString(formData, 'hardwareRequests'),
        snacks: getOptionalString(formData, 'snacks'),
        prizes: getOptionalString(formData, 'prizes'),
        song: getOptionalString(formData, 'song'),
        referralSource: getOptionArray(formData, 'referralSource', REFERRAL_SOURCE_OPTIONS),
        mlhAgreement: requireChecked(formData, 'mlhAgreement'),
        liabilityWaiver: getRequiredBoolean(formData, 'liabilityWaiver'),
        mlhCommunication: getOptionalBoolean(formData, 'mlhCommunication'),
        underrepresented: getOptionalOption(
            formData,
            'underrepresented',
            UNDERREPRESENTED_OPTIONS
        ),
        workshopInterest: getOptionalBoolean(formData, 'workshopInterest')
    };
}

async function submitApplication(
    application: Application,
    userId: Person['id']
): Promise<SubmitApplicationResult> {
    try {
        const response = await fetch(`${DATABASE_API_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                applied: true,
                applicationDecision: 'Pending',
                application: application
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit application');
        }

        const personData: Person = await response.json();
        return { success: true, personData, error: null };

    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, personData: null, error: 'Failed to submit application' };
    }
}

async function handleSubmit(
    formData: FormData,
    userId: Person['id']
): Promise<SubmitApplicationResult> {
    try {
        const application = parseApplication(formData);
        return await submitApplication(application, userId);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Invalid application data';
        console.error('Error validating application:', error);
        return { success: false, personData: null, error: message };
    }
}

export { handleSubmit };
