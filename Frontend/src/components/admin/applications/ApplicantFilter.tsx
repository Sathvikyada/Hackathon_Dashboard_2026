import type { Person } from "../../../types/person";
import { filterParticipants } from "../../../services/adminApplicationService";

import { useState } from "react";

interface ApplicantFilterProps {
    participants: Person[];
    setParticipants: (participants: Person[]) => void;
}

type FilterDictionary = Record<string, string | number | boolean>;

const ApplicantFilter = ({participants, setParticipants}: ApplicantFilterProps) => {
    const [filters, setFilters] = useState<FilterDictionary>({});

    filteredParticipants = filterParticipants(participants, filters);

    return (
        <div>
            {/* Your filter component code here */}
        </div>
    );
};

export default ApplicantFilter;