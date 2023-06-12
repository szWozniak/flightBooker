import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navigation/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Logout from './Pages/Logout/Logout';
import Flight from './Pages/Flights/Flight';
import Flights from './Pages/Flights/Flights';
import DeleteFlight from './Pages/Flights/DeleteFlight';
import AddFlight from './Pages/Flights/AddFlight';

const Main = (props: any) => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <div className="subpage">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/flights" element={<Flights />} />
                        <Route path="/addflight" element={<AddFlight />} />
                        <Route path="/deleteFlight/:id" element={<DeleteFlight />} />
                        <Route path="/flight/:id" element={<Flight />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default Main;