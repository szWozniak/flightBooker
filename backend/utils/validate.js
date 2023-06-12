const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const sql = require('../db.js');

exports.validate = async (req, res, next) => {
    if(!req.headers.authorization) return res.send({ status: "err", err: "UNAUTHORIZED"})
    let token = req.headers.authorization.split(" ")[1];
    
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err || !decoded.ClientID) return res.send({ status: "err", err: "UNAUTHORIZED"})
        
        if(decoded.permissions == "employee") return next();
        
        let user = await getByClientId(decoded.ClientID)
        res.locals.ClientID = decoded.ClientID;
        if(!user) return res.send({ status: "err", err: "UNAUTHORIZED"})

        next();
    });
}

let getByClientId = (ClientID) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Clients WHERE ClientID = '${ClientID}'`, (err, res) => {
            if(err || res.length == 0) return resolve(null)
            return resolve(res[0])
        })
    })
}