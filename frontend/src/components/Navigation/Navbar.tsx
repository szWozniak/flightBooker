import React from 'react';
import { Link } from "react-router-dom";
import { isPermitted } from '../../utils/jwtToken';

const Navbar = (props: any) => {
    return (
        <div className="navigation">
            {<Link to="/">Strona Główna</Link>}
            {isPermitted(0) && <Link to="/login">Logowanie</Link>}
            {isPermitted(0) && <Link to="/register">Rejestracja</Link>}
            {isPermitted(1) && <Link to="/flight/14">Rezerwacja Lotu</Link>}
            {isPermitted(1) && <Link to="/logout">Wyloguj sie!</Link>}

        </div>
    );
};

export default Navbar;