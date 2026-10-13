import './styles/header.css'
import Nav from './Nav'
import type { Person } from '../../types/person'
import type { PageOption } from '../../types/PageOption'
import { NavLink } from 'react-router-dom';

interface HeaderProps {
    logo: string;
    user: Person | null;
    setUser: (user: Person | null) => void;
    pageOptions: Set<PageOption>;
}

const Header = ({ logo, user, setUser, pageOptions }: HeaderProps) => {
    return (
        <header className = "header">
            <NavLink to="/" className="logo-link" aria-label="Go to home page">
                <img src={logo} alt="HackUMass" className="logo"/>
            </NavLink>

            <div className="Navbar">
                <Nav user={user} setUser={setUser} pageOptions={pageOptions} />
            </div>
        </header>
    )
}

export default Header