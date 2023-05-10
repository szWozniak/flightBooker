import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
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