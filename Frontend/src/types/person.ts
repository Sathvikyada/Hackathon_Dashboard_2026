import type { Application } from './Application';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    applied: boolean;
    applicationDecision: 'Accepted' | 'Rejected' | 'Pending' | 'Waitlisted' | 'N/A';
    rsvpStatus: 'Pending' | 'Accepted' | 'Declined' | 'N/A';
    organizer: boolean;
    application?: Application;
}
