const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const sql = require('../db.js');
let validate = require('../utils/validate');

router.get("/list/:from/:to", validate.validate, async (req, res) => {
    let sqlWhere = "";
    if(req.params.from != "dowolne") {
        sqlWhere = ` AND StartPort = '${req.params.from}'`
    }
    if(req.params.to != "dowolne") {
        sqlWhere += ` AND DestPort = '${req.params.to}'`
    }

    const flights = await getFlights(sqlWhere);
    return res.send({ status: "OK", flights: flights})
})

router.get("/airports", validate.validate, async (req, res) => {
    const airports = await getAirports();
    return res.send({ status: "OK", airports: airports})
})

router.get("/info/:flightid", async (req, res) => {
    const flight = await getFlight(req.params.flightid);
    const reserved =  Object.values(JSON.parse(JSON.stringify(await getReservations(req.params.flightid))));
    let seats=Array(flight.Seats).fill(0)
    for (resp of reserved){
        seats[resp.Seat]=2;
    }
    return res.send({ status: "OK", flight: {...flight,reservations:seats}})
})

let getFlights = (sqlWhere) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM AvailableSeats 
            WHERE Start > CURRENT_TIMESTAMP ${sqlWhere} ORDER BY Start ASC`, (err, res) => {
                if(err || res.length === 0) return resolve([])
                return resolve(res)
            })
    })
}

let getReservations = (id) =>{
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Reservations 
            WHERE FlightID = ${id} AND Status = 'A'`, (err, res) => {
            if(err || res.length === 0) return resolve(null)
            return resolve(res)
        })
    })

}
let getAirports = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Airports`, (err, res) => {
                if(err || res.length == 0) return resolve([])
                return resolve(res)
            })
    })
}

let getFlight = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Flights F INNER JOIN Planes P ON P.PlaneID = F.PlaneID 
            WHERE FlightID = ${id}`, (err, res) => {
                if(err || res.length == 0) return resolve(null)
                return resolve(res[0])
            })
    })
}

module.exports = router