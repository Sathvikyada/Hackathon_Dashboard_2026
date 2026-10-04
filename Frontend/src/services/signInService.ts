import type { Person } from '../types/person'

const DATABASE_API_URL: string = 'http://localhost:3001/people';

async function signIn(email:string): Promise<{success: boolean, personData: Person | null}> {
    try {
        const normalizedEmail = email.trim().toLowerCase();

        const response = await fetch(`${DATABASE_API_URL}?email=${encodeURIComponent(normalizedEmail)}`);

        if (!response.ok) {
            return { success: false, personData: null };
        }

        const personData: Person[] = await response.json();
        const person = personData.length > 0 ? personData[0] : null;

        return { success: person !== null, personData: person };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, personData: null };
    }
}

export { signIn };