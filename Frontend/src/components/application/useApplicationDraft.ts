import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';

import { APPLICATION_CONFIG } from '../../../data/application_configuration';

type DraftValue =
    | string
    | string[]
    | boolean;

type Draft = Record<string, DraftValue>;

type SaveStatus =
    | 'idle'
    | 'saved'
    | 'error';

interface UseApplicationDraftOptions {
    storageKey: string;
    intervalMs?: number;
}

const serializeForm = (
    form: HTMLFormElement,
): Draft => {
    const formData = new FormData(form);
    const draft: Draft = {};

    for (const section of APPLICATION_CONFIG) {
        for (const field of section.fields) {
            switch (field.type) {
                case 'checkbox':
                    draft[field.id] =
                        formData
                            .getAll(field.id)
                            .filter(
                                (value): value is string =>
                                    typeof value === 'string'
                            );
                    break;

                case 'agreement':
                    draft[field.id] =
                        formData.get(field.id) === 'true';
                    break;

                case 'file':
                    // File inputs cannot be restored.
                    break;

                default: {
                    const value =
                        formData.get(field.id);

                    draft[field.id] =
                        typeof value === 'string'
                            ? value
                            : '';

                    break;
                }
            }
        }
    }

    return draft;
};

const useApplicationDraft = ({
    storageKey,
    intervalMs = 20_000
}: UseApplicationDraftOptions) => {
    const formRef =
        useRef<HTMLFormElement>(null);

    const saveOnUnmountRef =
        useRef(true);

    const hasUnsavedChangesRef =
        useRef(false);

    const statusTimeoutRef =
        useRef<number | null>(null);

    const [saveStatus, setSaveStatus] =
        useState<SaveStatus>('idle');

    const [draft] = useState<Draft>(() => {
        const savedDraft =
            sessionStorage.getItem(storageKey);

        if (!savedDraft) {
            return {};
        }

        try {
            return JSON.parse(savedDraft);
        } catch {
            sessionStorage.removeItem(storageKey);
            return {};
        }
    });

    const markUnsaved = useCallback(() => {
        hasUnsavedChangesRef.current = true;
    }, []);

    const saveDraft = useCallback(() => {
        if (!formRef.current) {
            return;
        }

        try {
            const serialized =
                serializeForm(formRef.current);

            sessionStorage.setItem(
                storageKey,
                JSON.stringify(serialized)
            );

            hasUnsavedChangesRef.current = false;

            setSaveStatus('saved');

            if (statusTimeoutRef.current !== null) {
                window.clearTimeout(
                    statusTimeoutRef.current
                );
            }

            statusTimeoutRef.current =
                window.setTimeout(() => {
                    setSaveStatus('idle');
                }, 1500);

        } catch {
            setSaveStatus('error');
        }
    }, [storageKey]);

    const clearDraft = useCallback(() => {
        saveOnUnmountRef.current = false;
        hasUnsavedChangesRef.current = false;

        sessionStorage.removeItem(
            storageKey
        );

        setSaveStatus('idle');
    }, [storageKey]);

    useEffect(() => {
        const interval =
            window.setInterval(
                saveDraft,
                intervalMs
            );

        return () => {
            window.clearInterval(interval);

            if (statusTimeoutRef.current !== null) {
                window.clearTimeout(
                    statusTimeoutRef.current
                );
            }

            if (saveOnUnmountRef.current) {
                saveDraft();
            }
        };
    }, [intervalMs, saveDraft]);

    useEffect(() => {
        const handleBeforeUnload = (
            event: BeforeUnloadEvent
        ) => {
            if (!hasUnsavedChangesRef.current) {
                return;
            }

            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener(
            'beforeunload',
            handleBeforeUnload
        );

        return () => {
            window.removeEventListener(
                'beforeunload',
                handleBeforeUnload
            );
        };
    }, []);

    return {
        formRef,
        draft,
        saveDraft,
        clearDraft,
        saveStatus,
        markUnsaved
    };
};

export default useApplicationDraft;