import './styles/nav.css'
import type { Person } from '../../types/person';
import type { PageOption } from '../../types/PageOption';

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

interface NavProps {
    user: Person | null;
    setUser: (person: Person | null) => void;
    pageOptions: Set<PageOption>;
}

const Nav = ({ user, setUser, pageOptions }: NavProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    // If clicked outside the menu, close the menu
    useEffect(() => {
        if (!menuOpen) {
            return;
        }
        
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav className="nav" ref={navRef}>
            <button
                type="button"
                className="nav-menu-button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
            >
                ☰
            </button>

            <ul className={menuOpen ? 'nav-menu nav-menu-open' : 'nav-menu'}>
                {pageOptions && pageOptions.has('Home') && (
                    <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Apply') && (
                    <li><NavLink to="/apply" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Apply</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Application Status') && (
                    <li><NavLink to="/application-status" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Application Status</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Edit Application') && (
                    <li><NavLink to="/edit-application" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Edit Application</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Meals') && (
                    <li><NavLink to="/meals" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Meals</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Applications') && (
                    <li><NavLink to="/applications" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Applications</NavLink></li>
                )}

                {pageOptions && pageOptions.has('Scanner') && (
                    <li><NavLink to="/scanner" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Scanner</NavLink></li>
                )}

                {user && pageOptions.has('Settings') && (
                    <li><NavLink to="/settings" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
                )}

                {!user && (
                    <li><NavLink to="/sign-in" onClick={closeMenu} className="nav-auth-button">Sign In</NavLink></li>
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
                                setMenuOpen(false);
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