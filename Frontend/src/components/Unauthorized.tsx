import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div>
            <h1>401 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <Link to="/">Go back to the home page</Link>
        </div>
    );
}

export default Unauthorized;