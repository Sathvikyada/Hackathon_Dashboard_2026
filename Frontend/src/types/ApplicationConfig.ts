export type FieldWidth = 'half' | 'full';

export interface TextFieldConfig {
    type: 'text';
    id: string;
    label: string;
    required: boolean;
    inputType: 'text' | 'email' | 'tel' | 'number' | 'url';
    width: FieldWidth;
}

export interface SelectFieldConfig {
    type: 'select';
    id: string;
    label: string;
    required: boolean;
    options: string[];
    width: FieldWidth;
}

export interface LongTextFieldConfig {
    type: 'longText';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    rows: number;
}

export interface RadioFieldConfig {
    type: 'radio';
    id: string;
    label: string;
    required: boolean;
    options: string[];
    width: FieldWidth;
}

export interface CheckboxFieldConfig {
    type: 'checkbox';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    options: string[];
    width: FieldWidth;
}

export interface FileFieldConfig {
    type: 'file';
    id: string;
    label: string;
    required: boolean;
    description?: string;
    accept?: string;
    width: FieldWidth;
}

export interface AgreementFieldConfig {
    type: 'agreement';
    id: string;
    label: string;
    required: boolean;
    width: FieldWidth;
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