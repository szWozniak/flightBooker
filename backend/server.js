const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');

let app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();

const sql = require('./db.js');

app.get("/", (req, res) => {
    res.send({ status: "OK" })
})

const authRoute = require('./routes/auth')
app.use("/auth", authRoute)

app.listen(process.env.PORT, function () {
    console.log("Backend API listening on port " + process.env.PORT)
})