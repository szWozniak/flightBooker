import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../../../utils/jwtToken';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        deleteToken();
        navigate("/login");
    })

    return ( <div></div> );
};

export default Logout;