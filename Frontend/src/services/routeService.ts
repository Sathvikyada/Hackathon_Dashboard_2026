import type { Person } from '../types/person';
import type { PageOption } from '../types/PageOption'

function getAllowedPages(user: Person | null): Set<PageOption> {
    const options: Set<PageOption> = new Set();

    if (!user) {
        options.add('Home')
        return options;
    }

    options.add('Settings');
    
    if (user.organizer) {
        options.add('Applications')
        options.add('Applicant');
        options.add('Scanner');
        return options
    }

    options.add('Home')
    
    if (!user.applied) {
        options.add('Apply');
    } else {
        options.add('Application Status');

        if (user.applicationDecision === 'Pending') {
            options.add('Edit Application');
        }
        
        if (user.applicationDecision === 'Accepted' && user.rsvpStatus === 'Accepted') {
            options.add('Meals');
        }
    }

    return options;
}

function getApplicationStatusDisplay(user: Person | null): string | null {
    if (!user || !user.applied) {
        return null;
    }

    if (user.applicationDecision === 'Accepted') {
        return 'Accepted';
    }
    else if (user.applicationDecision === 'Rejected') {
        return 'Rejected';
    }
    else if (user.applicationDecision === 'Pending') {
        return 'Pending';
    }
    else if (user.applicationDecision === 'Waitlisted') {
        return 'Waitlisted';
    }

    return null;
}

function getRSVPStatusDisplay(user: Person | null): string | null {
    if (!user || !user.applied) {
        return null;
    }

    switch (user.rsvpStatus) {
        case 'Accepted': return 'RSVP Accepted';
        case 'Pending': return 'RSVP Pending';
        case 'Declined': return 'RSVP Declined';
        default: return null;
    }
}

export { getAllowedPages, getApplicationStatusDisplay, getRSVPStatusDisplay };