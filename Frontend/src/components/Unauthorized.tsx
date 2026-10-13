import './styles/content.css';
import './styles/unauthorized.css';
import { useDocumentTitle } from '../useDocumentTitle'

import { Link } from 'react-router-dom';

const Unauthorized = () => {
    useDocumentTitle('Unauthorized');

    return (
        <section className="content-page">
            <div className="content-card unauthorized-card">
                <h1>401 - Unauthorized</h1>

                <p>You do not have permission to access this page.</p>

                <Link to="/" className="unauthorized-home-link">
                    Go back to the home page
                </Link>
            </div>
        </section>
    );
};

export default Unauthorized;