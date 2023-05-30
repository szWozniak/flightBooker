import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from "react-router-dom";
import { isPermitted } from '../../utils/jwtToken';
import { useLocation } from "react-router-dom";

const Navbar = (props: any) => {
    const location = useLocation();

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