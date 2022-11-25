const express = require('express');
const scheduler = require('node-schedule');
const twig = require('twig');
const path = require('path');
const routers = require('./routes');
const bodyParser = require("body-parser");
const listController = require('./controllers/listController');
const app = express();


//To Increase size of json
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
    })
);

app.set("views", path.join(__dirname, "./views"));
app.set("twig options", {
    strict_variables: false
});

app.use('/', routers);


//scheduler.scheduleJob('00 */3 * * * * ', function() {
 //   listController.getListOptionData();
    // console.log("Testing ");
    // try {
    //     let optionsData = await axios.get('https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY')
    //     //.then(function (response) {
    //   // handle success
    //         const results = optionsData.data.records;
    //         console.log(results);
    //         let expireDate = results.expiryDates;

    //         let futureExpireDate = expireDate[0];

    //         let bankRecords = results.data;
    //         let aclRecords = bankRecords.filter(bnr => bnr.expiryDate === futureExpireDate);
    //         console.log(results.strikePrices);
    //         console.log(results.underlyingValue);
    //         //res.send(aclRecords.filter(bnr => bnr.strikePrice === results.underlyingValue));
    //         console.log('-------', new Date() ,'-----------------');
    //     //})
        
    // } catch (error) {
        
    // }
    
//});

app.listen(8989 , function (req, res) {
    console.log('Running on port 8989 ');
});