import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

const Navbar: React.FC<any> = (props: any): JSX.Element => {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className="menuIcon"
                >
                    <img src="/images/logo.png" />
                </IconButton>
                <Link className="title" to="/">
                    <Typography variant="h6" component="div">
                        FlightBooker
                    </Typography>
                </Link>
                <Link to="/login">
                    <Button color="inherit">Logowanie</Button>
                </Link>
                <Link to="/register">
                    <Button color="inherit">Rejestracja</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;