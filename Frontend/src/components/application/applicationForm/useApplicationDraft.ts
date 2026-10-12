import {useCallback, useEffect, useRef, useState} from 'react';
import { serializeForm } from './serializeForm';
import type { SerializedForm } from './serializeForm'

type SaveStatus =
    | 'idle'
    | 'saved'
    | 'error';

interface UseApplicationDraftOptions {
    storageKey: string;
    intervalMs?: number;
}

// Custom hook to store and render the application form draft in session storage
// Uses form ref to save on a fixed interval only if there is changes allowing for efficient saving.
const useApplicationDraft = ({storageKey, intervalMs = 20_000}: UseApplicationDraftOptions) => {
    // Creates a null FormElement that will later be assigned to the form element in the DOM.
    const formRef = useRef<HTMLFormElement>(null);
    // Reference to determine if the draft should be saved when the component unmounts/leaves as we don't need to if its already been saved.
    const saveOnUnmountRef = useRef(true);
    // Reference/flag to indicate if there are unsaved changes.
    const hasUnsavedChangesRef = useRef(false);
    // Reference used to clear the status after being displayed.
    const statusTimeoutRef = useRef<number | null>(null);

    // Status messages to be displayed 
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

    // Initialize the draft from session storage
    const [draft] = useState<SerializedForm>(() => {
        const savedDraft = sessionStorage.getItem(storageKey);

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

    // Use useCallback to memoize the function so it doesn't need to be recreated on every re-render
    const markUnsaved = useCallback(() => {
        hasUnsavedChangesRef.current = true;
    }, []);

    // These function is only re-recreated when the storageKey changes as the save location is now different
    const saveDraft = useCallback(() => {
        if (!formRef.current || !hasUnsavedChangesRef.current) {
            return;
        }

        try {
            const serialized = serializeForm(formRef.current);
            sessionStorage.setItem(storageKey, JSON.stringify(serialized));

            hasUnsavedChangesRef.current = false;
            setSaveStatus('saved');

            if (statusTimeoutRef.current !== null) {
                window.clearTimeout(
                    statusTimeoutRef.current
                );
            }
            // Sets the message that is passed to the form component and expires it in 1.5 seconds
            statusTimeoutRef.current =
                window.setTimeout(() => {
                    setSaveStatus('idle');
                }, 1500);

        } catch {
            setSaveStatus('error');
        }
    }, [storageKey]);

    // Provides a function to clear the draft when the user submits
    const clearDraft = useCallback(() => {
        saveOnUnmountRef.current = false;
        hasUnsavedChangesRef.current = false;

        sessionStorage.removeItem(storageKey);

        // Clear the status timeout
        if (statusTimeoutRef.current !== null) {
            window.clearTimeout(statusTimeoutRef.current);
            statusTimeoutRef.current = null;
        }

        setSaveStatus('idle');
    }, [storageKey]);

    // Save the draft automatically at the provided intervals
    // We useEffect here because we want to set up the interval when the component mounts and clean it up when it unmounts
    useEffect(() => {
        const interval = window.setInterval(saveDraft, intervalMs);

        // Clean up the interval when the component unmounts
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

    // Handle the beforeunload event to warn the user if they try to leave the page with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!hasUnsavedChangesRef.current) {
                return;
            }

            event.preventDefault();
            return '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return {formRef, draft, saveDraft, clearDraft, saveStatus, markUnsaved};
};

export default useApplicationDraft;