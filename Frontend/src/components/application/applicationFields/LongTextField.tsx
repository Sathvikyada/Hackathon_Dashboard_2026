import { useState } from 'react';

interface LongTextFieldProps {
    label: string;
    required: boolean;
    description?: string;
    id: string;
    rows: number;
    value?: string;
    maxLength?: number;
    maxWords?: number;
}

const LongTextField = ({ label, required, description, id, rows, value, maxLength, maxWords }: LongTextFieldProps) => {
    const [text, setText] = useState(value ?? '');
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const exceedsWordLimit = maxWords !== undefined && wordCount > maxWords;

    return (
        <div className="form-group long-text-field">
            <label htmlFor={id}>
                {label}
                {required && ' *'}
            </label>

            {description &&
                <p className="field-help">
                    {description}
                </p>
            }

            <textarea
                id={id}
                name={id}
                rows={rows}
                value={text}
                required={required}
                maxLength={maxLength}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setText(newValue);

                    if (maxWords !== undefined) {
                        const newWordCount = newValue.trim() ? newValue.trim().split(/\s+/).length : 0;

                        e.target.setCustomValidity(newWordCount > maxWords ? `Exceeds the maximum word count of ${maxWords}` : '');
                    }
                }}
            />

            {(maxWords !== undefined || maxLength !== undefined) && (
                <div className="field-limits">
                    {maxWords !== undefined && (
                        <span className={exceedsWordLimit ? 'field-limit-error' : ''}>
                            {wordCount} / {maxWords} words
                        </span>
                    )}

                    {maxLength !== undefined && (
                        <span>
                            {text.length} / {maxLength} characters
                        </span>
                    )}
                </div>
            )}
        </div>
    )
};

export default LongTextField;