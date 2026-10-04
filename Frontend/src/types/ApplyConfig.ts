export type FieldWidth = 'half' | 'full';

export interface TextFieldConfig {
    type: 'text';
    id: string;
    label: string;
    required: boolean;
    inputType: 'text' | 'email' | 'tel' | 'number' | 'url';
    width: FieldWidth;
    filterable: boolean;
}

export interface SelectFieldConfig {
    type: 'select';
    id: string;
    label: string;
    required: boolean;
    options: string[];
    width: FieldWidth;
    filterable: boolean;
}

export interface LongTextFieldConfig {
    type: 'longText';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    rows: number;
    filterable: boolean;
}

export interface RadioFieldConfig {
    type: 'radio';
    id: string;
    label: string;
    required: boolean;
    options: string[];
    width: FieldWidth;
    filterable: boolean;
}

export interface CheckboxFieldConfig {
    type: 'checkbox';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    options: string[];
    width: FieldWidth;
    filterable: boolean;
}

export interface FileFieldConfig {
    type: 'file';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    accept: string;
    width: FieldWidth;
    filterable: boolean;
}

export interface AgreementFieldConfig {
    type: 'agreement';
    id: string;
    label: string;
    required: boolean;
    width: FieldWidth;
    filterable: boolean;
}

export type FieldConfig =
    | TextFieldConfig
    | SelectFieldConfig
    | LongTextFieldConfig
    | RadioFieldConfig
    | CheckboxFieldConfig
    | FileFieldConfig
    | AgreementFieldConfig;

export interface FormSectionConfig {
    label: string;
    fields: FieldConfig[];
}