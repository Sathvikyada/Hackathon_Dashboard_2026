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

async function getParticipantById(id: string): Promise<Person> {
    const response = await fetch(`${DATABASE_API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch participant');
    }

    const person: Person = await response.json();
    return person;
}

async function updateApplicationDecision(
    id: string,
    decision: Person['applicationDecision'],
    admin: Person
): Promise<Person> {
    const response = await fetch(`${DATABASE_API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            applicationDecision: decision,
            applicationDecisionLastModified: new Date().toISOString(),
            applicationDecisionModifiedBy: admin.id,
            applicationDecisionModifiedByName: `${admin.firstName} ${admin.lastName}`
        })
    });

    if (!response.ok) {
        throw new Error('Failed to update application decision');
    }

    const person: Person = await response.json();
    return person;
}

export { getAllParticipants, getParticipantById, updateApplicationDecision };