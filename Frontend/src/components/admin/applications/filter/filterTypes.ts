export type FilterOperator =
    | 'equals'
    | 'notEquals'
    | 'contains';

export interface ParticipantFilter {
    id: string;
    source: 'person' | 'application';
    fieldId: string;
    operator: FilterOperator;
    value: string | string[];
}

export type FieldValueConfig =
    | {
        type: 'single';
        options: string[];
    }
    | {
        type: 'multiple';
        options: string[];
    }
    | {
        type: 'text';
    };
