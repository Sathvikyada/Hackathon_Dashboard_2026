import type { Person } from '../types/person'

const DATABASE_API_URL: string = 'http://localhost:3001/people';

async function handleSettingsUpdate(formData: FormData, userID: string): Promise<{success: boolean, personData: Person | null}> {
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');

    if (
        typeof firstName !== 'string' ||
        typeof lastName !== 'string' ||
        typeof email !== 'string'
    ) {
        alert('Invalid account information.');
        return { success: false, personData: null };
    }

    try {
        const response = await fetch(
            `${DATABASE_API_URL}/${userID}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim()
                })
            }
        );

        if (!response.ok) {
            throw new Error('Failed to update account');
        }

        const updatedPerson: Person = await response.json();
        return { success: true, personData: updatedPerson };
    } catch (error) {
        console.error('Error updating account:', error);
        return { success: false, personData: null };
    }
}

export { handleSettingsUpdate };