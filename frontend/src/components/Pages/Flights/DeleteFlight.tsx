import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHeaders } from '../../../utils/jwtToken';
import Plane from './Plane';

const DeleteFlight = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete("http://localhost:4000/flight/delete/" + id, getHeaders())
            .then((res) => {
                navigate("/flights");
            })
            .catch(() => {
                navigate("/flights");
            })
    }, [])
    
    return (
        <div></div>
    );
};

export default DeleteFlight;