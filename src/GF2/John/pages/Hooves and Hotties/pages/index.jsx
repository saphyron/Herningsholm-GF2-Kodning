import react, {useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../css/index.css";
import PageShell from "../layouts/PageShell";

export default function HoovesAndHotties() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const closeMenu = () => {
        setShowMenu(false);
    };
    const handleNavigation = (path) => {
        navigate(path);
        closeMenu();
    };

    return (
        <PageShell>
            <div className="hooves-and-hotties">
                <br></br>
                <div className="box"><p>Velkommen til Hooves and Hotties Siden!</p></div>
                <div className="box"><p>Hvis du vil se Hot Centaurs i action tryk herunder for at bekræfte du er over 18 år.</p></div>
                <button className="confirm-btn" onClick={() => handleNavigation('/hooves-and-hotties/centaur-list')}>Bekræft du er over 18 år</button>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
        </PageShell>
    );
}