import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | HackUMass Dashboard`;

        return () => {
            document.title = 'HackUMass Dashboard';
        };
    }, [title]);
};

export { useDocumentTitle };