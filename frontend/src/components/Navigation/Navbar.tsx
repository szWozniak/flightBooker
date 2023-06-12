import React from 'react';
import { Link } from "react-router-dom";
import { isPermitted } from '../../utils/jwtToken';
import { useLocation } from "react-router-dom";

const Navbar = (props: any) => {
    //This line exists here, so the navbar will RERENDER after location change.
    //removing it will cause bugs with navbar tabs display.
    const location = useLocation();

    return (
        <div className="navigation">
            {<Link to="/">Strona Główna</Link>}
            {isPermitted(0) && <Link to="/login">Logowanie</Link>}
            {isPermitted(0) && <Link to="/register">Rejestracja</Link>}
            {isPermitted(1) && <Link to="/flights">Wyszukaj lot</Link>}
            {isPermitted(2) && <Link to="/addflight">Dodaj lot</Link>}
            {isPermitted(1) && <Link to="/logout">Wyloguj sie!</Link>}

        </div>
    );
};

export default Navbar;