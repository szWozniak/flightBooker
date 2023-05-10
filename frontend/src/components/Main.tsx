import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navigation/Navbar';
import TextField from "@mui/material/TextField";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { Box, createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#FAB54E', main: '#FBA023', dark: '#FBA023', contrastText: '#fff'
      },
      secondary: {
        light: '#720E07', main: '#720E07', dark: '#45050C', contrastText: '#000'
      }
    }
});

const Main: React.FC<any> = (props: any): JSX.Element => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
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
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default Main;