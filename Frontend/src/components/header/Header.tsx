import './header.css'
import Nav from './Nav'
import type { Person } from '../../types/person'
import type { PageOption } from '../../types/PageOption'

interface HeaderProps {
    logo: string;
    user: Person | null;
    setUser: (user: Person | null) => void;
    pageOptions: Set<PageOption>;
}

const Header = ({ logo, user, setUser, pageOptions }: HeaderProps) => {
    return (
        <header className = "header">
            <img src={logo} alt="HackUMass_Logo" className="logo" />
            <div className="Navbar">
                <Nav user={user} setUser={setUser} pageOptions={pageOptions} />
            </div>
        </header>
    )
}

export default Header