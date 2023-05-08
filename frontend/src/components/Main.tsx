import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navigation/Navbar';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const Main: React.FC<any> = (props: any): JSX.Element => {
    return (
        <BrowserRouter>
            <Box className="mainContainer">
                <Navbar />
                <Box className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    );
};

export default Main;