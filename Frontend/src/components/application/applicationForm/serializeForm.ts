import { APPLICATION_CONFIG } from "../../../../data/application_configuration";

export type SerializedFormValue =
    | string
    | string[]
    | boolean;

export type SerializedForm = Record<string, SerializedFormValue>;

// Serialize the form data into a object to save
const serializeForm = (form: HTMLFormElement): SerializedForm => {
    const formData = new FormData(form);
    const values: SerializedForm = {};

    for (const section of APPLICATION_CONFIG) {
        for (const field of section.fields) {
            switch (field.type) {
                case 'checkbox':
                    values[field.id] =
                        formData.getAll(field.id)
                            .filter((value): value is string => typeof value === 'string');
                    break;

                case 'agreement':
                    values[field.id] = formData.get(field.id) === 'true';
                    break;

                case 'file':
                    // File inputs cannot be restored.
                    break;

                default: {
                    const value = formData.get(field.id);
                    values[field.id] = typeof value === 'string' ? value : '';
                    break;
                }
            }
        }
    }

    return values;
};

export { serializeForm };