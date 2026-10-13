interface ApplicantNavigationProps {
    currentIndex: number;
    totalApplicants: number;
    previousId: string | null;
    nextId: string | null;
    updatingDecision: boolean;
    onPrevious: () => void;
    onNext: () => void;
    className?: string;
}

const ApplicantNavigation = ({
    currentIndex,
    totalApplicants,
    previousId,
    nextId,
    updatingDecision,
    onPrevious,
    onNext,
    className = ''
}: ApplicantNavigationProps) => {
    if (currentIndex === -1) {
        return null;
    }

    return (
        <div className={`applicant-navigation ${className}`}>
            <button
                type="button"
                disabled={!previousId || updatingDecision}
                onClick={onPrevious}
            >
                Previous
            </button>

            <span>
                {currentIndex + 1} of {totalApplicants}
            </span>

            <button
                type="button"
                disabled={!nextId || updatingDecision}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
};

export default ApplicantNavigation;