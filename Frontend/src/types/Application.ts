export interface Application {
    lastModified: string;

    email: string;
    firstName: string;
    lastName: string;

    phone: string;
    age: number;
    gender: string;
    pronouns: string | null;
    country: string;

    raceEthnicity: string[];
    sexualOrientation: string[];

    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
    shirtSize: string;

    university: string;
    major: string;
    graduationYear: number;
    educationLevel: string;

    attendedHackathon: boolean;
    hackathonCount: number | null;

    attendedHackUMass: boolean;
    previousExperience: string | null;

    programmingSkills: string | null;
    hardwareSkills: string | null;
    otherSkills: string | null;

    hasTeam: boolean;

    whyHackUMass: string;
    goals: string;

    travelSupport: string[];
    travelDetails: string | null;

    mealAccommodations: boolean;
    foodRestrictions: string | null;

    hardwareRequests: string | null;
    snacks: string | null;
    prizes: string | null;
    song: string | null;

    referralSource: string[];

    mlhAgreement: boolean;
    liabilityWaiver: boolean;
    mlhCommunication: boolean | null;

    underrepresented: string | null;
    workshopInterest: boolean | null;
}