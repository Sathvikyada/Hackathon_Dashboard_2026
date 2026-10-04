import type { Person } from '../../types/person'

interface ScannerProp {
    user: Person;
}

const Scanner = ({ user }: ScannerProp) => {
    return (
        <div>
            <h1>Scanner</h1>
            <p>User: {user.firstName}</p>
        </div>
    );
};

export default Scanner;