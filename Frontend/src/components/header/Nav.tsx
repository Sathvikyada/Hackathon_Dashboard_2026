import './nav.css'
import type { Person } from '../../types/person';
import type { PageOption } from '../../types/PageOption';

import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

interface NavProps {
    user: Person | null;
    setUser: (person: Person | null) => void;
    pageOptions: Set<PageOption>;
}

const Nav = ({ user, setUser, pageOptions }: NavProps) => {

    return (
        <nav className="nav">
            <ul>
                {pageOptions && pageOptions.has('Home') && (
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Apply') && (
                    <li><NavLink to="/apply" className={({ isActive }) => isActive ? 'active' : ''}>Apply</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Application Status') && (
                    <li><NavLink to="/application-status" className={({ isActive }) => isActive ? 'active' : ''}>Application Status</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Edit Application') && (
                    <li><NavLink to="/edit-application" className={({ isActive }) => isActive ? 'active' : ''}>Edit Application</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Meals') && (
                    <li><NavLink to="/meals" className={({ isActive }) => isActive ? 'active' : ''}>Meals</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Applications') && (
                    <li><NavLink to="/applications" className={({ isActive }) => isActive ? 'active' : ''}>Applications</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Scanner') && (
                    <li><NavLink to="/scanner" className={({ isActive }) => isActive ? 'active' : ''}>Scanner</NavLink></li>
                )}

                {user && pageOptions.has('Settings') && (
                    <li><NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
                )}

                {!user && (
                    <li>
                        <NavLink
                            to="/sign-in"
                            className="nav-auth-button"
                        >
                            Sign In
                        </NavLink>
                    </li>
                )}

                {user && (
                    <li>
                        <button
                            type="button"
                            className="nav-auth-button"
                            onClick={() => {
                                sessionStorage.removeItem('applicationFilters');
                                sessionStorage.removeItem('applicationSearch');
                                sessionStorage.removeItem('hackumassApplicationDraft:new');
                                sessionStorage.removeItem('hackumassApplicationDraft:edit');
                                setUser(null);
                                toast.success('Sign-out successful!');
                            }}
                        >
                            Sign Out
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Nav