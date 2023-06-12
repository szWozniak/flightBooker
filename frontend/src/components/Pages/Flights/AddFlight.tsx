import React, {useState, useEffect} from 'react';
import { getHeaders, isPermitted } from '../../../utils/jwtToken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFlight = () => {
    const navigate = useNavigate();
    const [airports, setAirports] = useState([]);
    const [airportFrom, setAirportFrom] = useState("dowolne");
    const [airportTo, setAirportTo] = useState("dowolne");
    const [planes, setPlanes] = useState([]);
    const [plane, setPlane] = useState("dowolne");
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/flight/airports", getHeaders())
            .then((res) => {
                if(res?.data?.status == "OK") {
                    setAirports(res.data.airports)
                }
            })
            .catch(() => {
                navigate("/");
            })

        axios.get("http://localhost:4000/flight/planes", getHeaders())
            .then((res) => {
                if(res?.data?.status == "OK") {
                    setPlanes(res.data.planes)
                }
            })
            .catch(() => {
                navigate("/");
            })
    }, [])

    const addFlight = () => {
        axios.post("http://localhost:4000/flight/add", {
            airportFrom: airportFrom,
            airportTo: airportTo,
            dateFrom: dateFrom,
            dateTo: dateTo,
            plane: plane
        }, getHeaders())
            .then((res) => {
                navigate("/flights");
            })
            .catch(() => {
                navigate("/flights");
            })
    }

    return (
        <div className="inputForm">
            <span>Lotnisko <b>odlotu</b> </span>
            <select value={airportFrom} defaultValue="dowolne" onChange={(e: any) => {
                setAirportFrom(e.nativeEvent.target.value);
            }}>
                <option value="dowolne" disabled>wybierz lotnisko</option>
                {airports.map((airport: any) => {
                    return (<option key={airport.AirportCode} value={airport.AirportCode}>{airport.AirportCode}</option>)
                })}
            </select>
            <span>Lotnisko <b>przylotu</b> </span>
            <select value={airportTo} defaultValue="dowolne" onChange={(e: any) => {
                setAirportTo(e.nativeEvent.target.value);
            }}>
                <option value="dowolne" disabled>wybierz lotnisko</option>
                {airports.map((airport: any) => {
                    return (<option key={airport.AirportCode} value={airport.AirportCode}>{airport.AirportCode}</option>)
                })}
            </select>


            <span>Samolot</span>
            <select value={plane} defaultValue="dowolne" onChange={(e: any) => {
                setPlane(e.nativeEvent.target.value);
            }}>
                <option value="dowolne" disabled>wybierz samolot</option>
                {planes.map((plane: any) => {
                    return (<option key={plane.PlaneID} value={plane.PlaneID}>{plane.PlaneType} ({plane.Seats})</option>)
                })}
            </select>

            <span>Data/godzina odlotu</span>
            <input type="datetime-local" value={dateFrom} onChange={(e: any) => {
                setDateFrom(e?.nativeEvent?.target?.value)
            }}/>
            
            <span>Data/godzina przylotu</span>
            <input type="datetime-local" value={dateTo} onChange={(e: any) => {
                setDateTo(e?.nativeEvent?.target?.value)
            }} />

            <button onClick={addFlight}>Zaloguj sie!</button>
        </div>
    );
};

export default AddFlight;