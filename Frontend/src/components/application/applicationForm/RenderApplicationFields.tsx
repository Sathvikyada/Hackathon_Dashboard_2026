import type { FieldConfig } from '../../../types/ApplyConfig';
import type { ApplicationAnswer} from '../../../types/Application';

import TextField from '../applicationFields/TextField';
import SelectField from '../applicationFields/SelectField';
import LongTextField from '../applicationFields/LongTextField';
import RadioField from '../applicationFields/RadioField';
import CheckboxField from '../applicationFields/CheckboxField';
import FileField from '../applicationFields/FileField';
import AgreementField from '../applicationFields/AgreementField';

interface ShouldRenderFieldProps {
    field: FieldConfig;
    currentValues: Record<string, ApplicationAnswer>;
}

const shouldRenderField = ({field, currentValues}: ShouldRenderFieldProps): boolean => {
    if (!field.dependencies) {
        return true;
    }

    return field.dependencies.every((dependency) => {
        const dependencyValue =
            currentValues[dependency.fieldId];

        if (Array.isArray(dependencyValue)) {
            return dependencyValue.includes(
                String(dependency.value)
            );
        }

        return dependencyValue === dependency.value;
    });
};

interface RenderApplicationFieldsProps {
    field: FieldConfig;
    currentValues: Record<string, ApplicationAnswer>;
}
const RenderApplicationFields = ({field, currentValues}: RenderApplicationFieldsProps) => {

    if (!shouldRenderField({field, currentValues})) {
        return null;
    }

    const value = currentValues[field.id];

    switch (field.type) {
        case 'text':
            return (
                <TextField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    type={field.inputType}
                    width={field.width}
                    value={
                        typeof value === 'string' ||
                        typeof value === 'number'
                            ? String(value)
                            : undefined
                    }
                    min={field.min}
                    max={field.max}
                    maxLength={field.maxLength}
                />
            );

        case 'select':
            return (
                <SelectField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    options={field.options}
                    width={field.width}
                    value={
                        typeof value === 'string'
                            ? value
                            : undefined
                    }
                />
            );

        case 'longText':
            return (
                <LongTextField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    description={field.description}
                    rows={field.rows}
                    value={
                        typeof value === 'string'
                            ? value
                            : undefined
                    }
                    maxLength={field.maxLength}
                    maxWords={field.maxWords}
                />
            );

        case 'radio':
            return (
                <RadioField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    options={field.options}
                    width={field.width}
                    value={
                        typeof value === 'string'
                            ? value
                            : undefined
                    }
                />
            );

        case 'checkbox':
            return (
                <CheckboxField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    description={field.description}
                    options={field.options}
                    width={field.width}
                    values={
                        Array.isArray(value)
                            ? value
                            : undefined
                    }
                />
            );

        case 'file':
            return (
                <FileField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    description={field.description}
                    accept={field.accept}
                    width={field.width}
                />
            );

        case 'agreement':
            return (
                <AgreementField
                    id={field.id}
                    label={field.label}
                    required={field.required}
                    width={field.width}
                    value={
                        typeof value === 'boolean'
                            ? value
                            : undefined
                    }
                />
            );
    }
};

export default RenderApplicationFields;