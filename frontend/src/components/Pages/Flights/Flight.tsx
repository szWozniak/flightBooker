import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHeaders } from '../../../utils/jwtToken';
import Plane from './Plane';

const Flight = () => {
    const { id } = useParams();
    const [flight, setFlight] = useState<any>(null);

    useEffect(() => {
        axios.get("http://localhost:4000/flight/info/" + id, getHeaders())
            .then((res) => {
                if(res?.data?.status == "OK") {
                    setFlight(res.data.flight)

                }
            })
    }, [])

    if(!flight) return <div></div>
    let startDate = (new Date(flight.Start)).toLocaleString('pl-pl');
    let landDate = (new Date(flight.Land)).toLocaleString('pl-pl');

    return (
        <div>
            <table className="flightsTable">
                <thead>
                    <tr>
                        <th>Numer lotu</th>
                        <th>Odlot</th>
                        <th>Przylot</th>
                        <th>Samolot</th>
                        <th>Dostępne Miejsca</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{flight?.FlightID}</td>
                        <td className="airportDate"><h4>{flight?.StartPort}</h4> <span>{startDate}</span></td>
                        <td className="airportDate"><h4>{flight?.DestPort}</h4> <span>{landDate}</span></td>
                        <td>{flight.PlaneType}</td>
                        <td className="seats"><span>{flight.Seats}</span>/{flight.Seats}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Rezerwacja miejsc</h3>
            <Plane 
                rowTemplate={flight?.SeatsPattern}
                rowCount={flight?.Rownum}
            />
        </div>
    );
};

export default Flight;