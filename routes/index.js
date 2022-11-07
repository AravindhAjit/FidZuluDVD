const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const DVDsjson = require('../module/dvd');
const url = require('url');

function computePrice(json, percent) {
    percent = percent / 100;
    for (let dvd of json) {
        console.log(dvd.price);
        dvd.price = dvd.price * (1 + percent)
        console.log(dvd.price);
    }
    console.log(json);
    return json
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'BackendTeamB' });
});

router.get('/DVDs/all/:location?', (req, res, next) => {

    var param = req.params.location;
    console.log('got into dvd/all/:location ' + param);
    if (param === undefined) param = '';
    const result = DVDsjson.list();
    if (result) {
        if (param.toLowerCase() === "durham") {
            result.forEach(element => {
                element.price = (element.price * 1.08)
            });
        } else if (param.toLowerCase() === "raleigh") {
            result.forEach(element => {
                element.price = (element.price * 1.075)
            });
        } else if (param.toLowerCase() === "") {} else {
            next(createError(404));
        }
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(result));
    } else {
        next(createError(404));
    }
});



router.get('/DVDs/team', (req, res, next) => {
    let result = { "team": "DVD", "membersNames": ["Aravindhan", "Pooja", "Pratik", "Nandana"] };
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(result));
})


module.exports = router;