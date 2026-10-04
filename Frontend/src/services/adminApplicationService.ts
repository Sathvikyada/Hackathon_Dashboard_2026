import type { Person } from "../types/person";

const DATABASE_API_URL: string = 'http://localhost:3001/people';

async function getAllParticipants(): Promise<Person[]> {
    const response = await fetch(DATABASE_API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch participants');
    }
    
    const data: Person[] = await response.json();
    const participants = data.filter(person => !person.organizer)
    return participants;
}

function filterParticipants(participants: Person[], filters: string[]): Person[] {
    return participants.filter(person => {
        return filters.every(filter => {
            return Object.values(person).some(value => 
                typeof value === 'string' && value.toLowerCase().includes(filter.toLowerCase())
            );
        });
    });
}

async function getParticipantById(id: string): Promise<Person> {
    const response = await fetch(`${DATABASE_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch participant');
    }

    const person: Person = await response.json();
    return person;
}

export { getAllParticipants, filterParticipants, getParticipantById };