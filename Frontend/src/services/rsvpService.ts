import type { Person } from "../types/person";

const DATABASE_API_URL: string = 'http://localhost:3001/people';

async function handleRSVPUpdate(userId: string, rsvpStatus: 'Accepted' | 'Declined'): Promise<Person | null> {
    try {
        const response = await fetch(`${DATABASE_API_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rsvpStatus }),
        });

        if (!response.ok) {
            throw new Error('Failed to update RSVP status');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating RSVP status:', error);
        return null;
    }
}

export { handleRSVPUpdate };