const express = require('express');
const mysqlConnection = require('./db/db');
const request = require('request');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))

app.use(flash());
app.use(expressValidator());

app.get('/', (req, res) => {
    res.render('pages/index')
});
app.get('/signin', (req, res) => {
    res.render('pages/index')
});
app.get('/signup', (req, res) => {
    res.render('pages/signup')
});
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.render('pages/dashboard', {
            phone: req.session.phone,
            name: req.session.name,
            dob: req.session.dob,
            location: req.session.location,
            covid_status: req.session.covid_status
        });
    } else {
        req.flash('success', 'Please login first!');
        res.redirect('/signin');
    }
});

app.get('/takeCovidTest', (req, res) => {
    if (req.session.loggedin) {
        res.render('pages/question')
    } else {
        req.flash('success', 'Please login first!');
        res.redirect('/signin');
    }
});

app.post('/authentication', function (req, res, next) {
    var phone = req.body.phone;
    var pin = req.body.pin;
    mysqlConnection.query(`SELECT * FROM ${process.env.user_table} WHERE phone_no = ? AND pin = ?`, [phone, pin], function (err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Please enter correct phone number and pin!')
            res.redirect('/signin')
        } else {
            req.session.loggedin = true;
            req.session.phone = phone;
            req.session.name = rows[0].full_name;
            req.session.dob = rows[0].dob;
            req.session.location = rows[0].full_address;
            req.session.covid_status = rows[0].covid_status;
            res.redirect('/dashboard');
        }
    })
})


app.post('/createUser', (req, res) => {
    mysqlConnection.query(`INSERT INTO ${process.env.user_table} (phone_no, pin, full_name, full_address, dob, covid_status) VALUES (?, ?, ?, ?, ?, ?);`, [req.body.phone, req.body.pin, req.body.name, req.body.address, req.body.dob, null], (err, rows, fields) => {
        if (!err) {
            req.flash('success', 'You have successfully signup!');
            return res.redirect('/signin');
        } else {
            console.log(err);
            res.render({ alert: "Account Creation Failed" })
        }
    })
});

app.post('/updateCovidStatus', async (req, res) => {
    const questions = [req.body.Q1, req.body.Q2, req.body.Q3, req.body.Q4, req.body.Q5, req.body.Q6, req.body.Q7, req.body.Q8, req.body.Q9, req.body.Q10, req.body.Q11, req.body.Q12, req.body.Q13, req.body.Q14, req.body.Q15]
    console.log(questions)
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:5000/predictCovidStatus',
        json: { Ques : questions}
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        let covid_status = body;
        let phone_no =  req.session.phone
        req.session.covid_status = body

        mysqlConnection.query(`UPDATE ${process.env.user_table} SET covid_status = ? WHERE phone_no = ?`, [covid_status, phone_no], (err, rows, fields) => {
            if (!err)
                return res.redirect('/dashboard');
            else
                console.log(err);
        })
        // console.log('Upload successful!  Server responded with:', body);
       
    })


});

app.listen(3000, () => {
    console.log(`app started to listen on PORT ${3000}`);
})