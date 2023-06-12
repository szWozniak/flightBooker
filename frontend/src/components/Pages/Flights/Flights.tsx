import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getHeaders, isPermitted } from '../../../utils/jwtToken';
import AirportMap from './AirportMap';

const Flights = () => {
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [airports, setAirports] = useState([]);
    const [airportFrom, setAirportFrom] = useState("dowolne");
    const [airportTo, setAirportTo] = useState("dowolne");
    const [showMap, setShowMap] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:4000/flight/list/" + airportFrom + "/" + airportTo, getHeaders())
            .then((res) => {
                if(res?.data?.status == "OK") {
                    setFlights(res.data.flights)
                }
            })
            .catch(() => {
                navigate("/");
            })

        axios.get("http://localhost:4000/flight/airports", getHeaders())
            .then((res) => {
                if(res?.data?.status == "OK") {
                    setAirports(res.data.airports)
                }
            })
            .catch(() => {
                navigate("/");
            })

    }, [airportFrom, airportTo])

    return (
        <div>
            <div className="searchOptions">
                <span>Lotnisko <b>odlotu</b> </span>
                <select value={airportFrom} defaultValue="dowolne" onChange={(e: any) => {
                    setAirportFrom(e.nativeEvent.target.value);
                }}>
                    <option value="dowolne">dowolne</option>
                    {airports.map((airport: any) => {
                        return (<option key={airport.AirportCode} value={airport.AirportCode}>{airport.AirportCode}</option>)
                    })}
                </select>
                <button onClick={() => {
                    if(showMap == 1) setShowMap(0);
                    else setShowMap(1)
                }}><img src="/images/mapa.png" /></button>
                <span>Lotnisko <b>przylotu</b> </span>
                <select value={airportTo} defaultValue="dowolne" onChange={(e: any) => {
                    setAirportTo(e.nativeEvent.target.value);
                }}>
                    <option value="dowolne">dowolne</option>
                    {airports.map((airport: any) => {
                        return (<option key={airport.AirportCode} value={airport.AirportCode}>{airport.AirportCode}</option>)
                    })}
                </select>
                <button onClick={() => {
                    if(showMap == 2) setShowMap(0);
                    else setShowMap(2);
                }}><img src="/images/mapa.png" /></button>
            </div>
            {showMap == 1 && <AirportMap airports={airports} setAirport={setAirportFrom} selectedAirport={airportFrom}
            />}
            {showMap == 2 && <AirportMap airports={airports} setAirport={setAirportTo} selectedAirport={airportTo}
            />}
            <table className="flightsTable">
                <thead>
                    <tr>
                        <th>Numer lotu</th>
                        <th>Odlot</th>
                        <th>Przylot</th>
                        <th>Samolot</th>
                        <th>Dostępne Miejsca</th>
                        <th>Rezerwacja</th>
                        {isPermitted(2) && <th>Dla pracownika</th>}
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight: any, index: number) => {
                        let startDate = (new Date(flight.Start)).toLocaleString('pl-pl');
                        let landDate = (new Date(flight.Land)).toLocaleString('pl-pl');
                        return (<tr key={index}>
                            <td>{flight.FlightID}</td>
                            <td className="airportDate"><h4>{flight.StartPort}</h4> <span>{startDate}</span></td>
                            <td className="airportDate"><h4>{flight.DestPort}</h4> <span>{landDate}</span></td>
                            <td>{flight.PlaneType}</td>
                            <td className="seats"><span>{flight.Available}</span>/{flight.Seats}</td>
                            <td className="reservation"><Link className="actionButton" to={`/flight/${flight.FlightID}`}>Rezerwacja</Link></td>
                            {isPermitted(2) &&
                                <td className="reservation"><Link className="actionButton redButton" to={`/deleteFlight/${flight.FlightID}`}>Usuń lot</Link></td>}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Flights;