const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mysql = require('mysql');

app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smtb',
    multipleStatements: true
});

app.listen(5000, () =>
    console.log(`listening on port: ${port}`),
);

app.get('/seasons', (req, res) => {
    pool.query('SELECT * FROM SEASON', (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json(rows);
        }
    })
});
app.get('/seasons/:id', (req, res) => {
    pool.query('SELECT * FROM SEASON WHERE SEASONID = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json(rows);
        }
    })
});
app.put('/seasons/:id', (req, res) => {
    pool.query('', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json(rows);
        }
    })
});
app.get('/season/user/:id', (req, res) => {
    console.log(req.params.id);
    pool.query('SELECT SEASON.SEASONID, SEASON.STARTDATE, SEASON.ENDDATE, TOURNEY.USERID FROM SEASON , TOURNEY WHERE SEASON.SEASONID = TOURNEY.SEASONID AND TOURNEY.USERID = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.length > 0) {
                res.json(rows);
            }
        }
    })
});
app.post('/createSeason', (req, res) => {
    if (req.body === undefined) {
        console.log("body is null for some fucked up reason")
    }
    pool.query('INSERT INTO `season`(`SEASONID`, `STARTDATE`, `ENDDATE`, `COMMUNITYID`) VALUES (?,?,?,?)', [req.body.id, req.body.startDate, req.body.endDate, req.body.commId], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.length > 0) {
                res.json(rows);
            }
        }
    })
});