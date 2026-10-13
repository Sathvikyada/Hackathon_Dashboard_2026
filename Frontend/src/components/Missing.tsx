import './styles/content.css';
import './styles/missing.css';

import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../useDocumentTitle'

const Missing = () => {
    useDocumentTitle('Page Not Found');
    
    return (
        <section className="content-page">
            <div className="content-card missing-card">
                <h1>404 - Page Not Found</h1>

                <p>The page you are looking for does not exist.</p>

                <Link to="/" className="missing-home-link">
                    Go back to the home page
                </Link>
            </div>
        </section>
    );
};

export default Missing;