const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const sql = require('../db.js');

router.post("/login", async (req, res) => {
    let user = await getByEmail(req.body.email);
    if(user == null) return res.send({ status: "err" })

    let token;
    try {
        token = jwt.sign(
            { ClientID: user.ClientID, permissions: "user" },
            process.env.SECRET,
            { expiresIn: "24h" })
    } catch(err) {
        return res.send({ status: "err" })
    }

    bcrypt.compare(req.body.password, user.Password, (err, isValid) => {
        if(isValid) {
            return res.send({ status: "OK", token: token, permissions: "user" })
        } else {
            return res.send({ status: "err" })
        }
    })
})

router.post("/employeeLogin", async (req, res) => {
    let user = await getEmployeeByEmail(req.body.email);
    if(user == null) return res.send({ status: "err" })

    let token;
    try {
        token = jwt.sign(
            { ClientID: user.WorkerID, permissions: "employee" },
            process.env.SECRET,
            { expiresIn: "24h" })
    } catch(err) {
        return res.send({ status: "err" })
    }

    bcrypt.compare(req.body.password, user.Password, (err, isValid) => {
        if(isValid) {
            return res.send({ status: "OK", token: token, permissions: "employee" })
        } else {
            return res.send({ status: "err" })
        }
    })
})

router.post("/register", (req, res) => {
    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(req.body.password, salt)
    }).then(async (hash) => {
        let created = await createUser(req.body, hash)

        if(created) return res.send({ status: "OK" })
        else return res.send({ status: "err" })
    }).catch((err) => {
        return res.send({ status: "err" })
    })
})

let getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Clients WHERE Email = '${email}'`, (err, res) => {
            if(err || res.length == 0) return resolve(null)
            return resolve(res[0])
        })
    })
}

let getEmployeeByEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM Employees WHERE Email = '${email}'`, (err, res) => {
            if(err || res.length == 0) return resolve(null)
            return resolve(res[0])
        })
    })
}

let createUser = (user, hash) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO Clients (Firstname, Lastname, Email, Phone, Password, Passport) 
            VALUES ('${user.firstname}', '${user.lastname}', '${user.email}', '${user.phone}', 
            '${hash}', '${user.passport}')`, (err, res) => {
            
            if(err) return resolve(null)
            return resolve(res)
        })
    })
}

module.exports = router