var express = require('express');
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

//constant for GPIO pins
const LIGHT = 37;
const FAN = 35;
const CHARGER = 36;
const EXTENSION = 38;
const LED = 40;

//led status 
var ledStatus = "OFF";
var lightStatus = "OFF";
var fanStatus = "OFF";
var chargerStatus = "OFF";
var extensionStatus = "OFF";

// gpio pin setup
gpio.setup(LIGHT, gpio.DIR_OUT);
gpio.setup(FAN, gpio.DIR_OUT);
gpio.setup(CHARGER, gpio.DIR_OUT);
gpio.setup(EXTENSION, gpio.DIR_OUT);
gpio.setup(LED, gpio.DIR_OUT);

// express code
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

// go to cp
app.get("/cp", function(req, res) {
    console.info("control pannel");
    var led = req.query.led;
    var light = req.query.light;
    var fan = req.query.fan;
    var charger = req.query.charger;
    var extension = req.query.extension;
    if (led != undefined) {
        console.log("Getting request to " + led + " led");
        if (led == "on") {
            gpio.write(LED, true, function(err) {
                if (err) throw err;
                ledStatus = "ON";
                console.log("led" + ": " + ledStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        } else if (led == "off") {
            gpio.write(LED, false, function(err) {
                if (err) throw err;
                ledStatus = "OFF";
                console.log("led" + ": " + ledStatus);            
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        }
    } else if (light != undefined) {
        console.log("Getting request to " + light + " light");
        if (light == "on") {
            gpio.write(LIGHT, true, function(err) {
                if (err) throw err;
                lightStatus = "ON";
                console.log("LIGHT: " + lightStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        } else if (light == "off") {
            gpio.write(LIGHT, false, function(err) {
                if (err) throw err;
                lightStatus = "OFF";
                console.log("LIGHT: " + lightStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        }
    } else if (fan != undefined) {
        console.log("Getting request to " + fan + " fan");
        if (fan == "on") {
            gpio.write(FAN, true, function(err) {
                if (err) throw err;
                fanStatus = "ON";
                console.log("fan" + ": " + fanStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        } else if (fan == "off") {
            gpio.write(FAN, false, function(err) {
                if (err) throw err;
                fanStatus = "OFF";
                console.log("fan" + ": " + fanStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        }
    } else if (charger != undefined) {
        console.log("Getting request to " + charger + " charger");
        if (charger == "on") {
            gpio.write(CHARGER, true, function(err) {
                if (err) throw err;
                chargerStatus = "ON";
                console.log("charger" + ": " + chargerStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        } else if (charger == "off") {
            gpio.write(CHARGER, false, function(err) {
                if (err) throw err;
                chargerStatus = "OFF";
                console.log("charger" + ": " + chargerStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        }
    } else if (extension != undefined) {
        console.log("Getting request to " + extension + " extension");
        if (extension == "on") {
            gpio.write(EXTENSION, true, function(err) {
                if (err) throw err;
                extensionStatus = "ON";
                console.log("charger" + ": " + extensionStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        } else if (extension == "off") {
            gpio.write(EXTENSION, false, function(err) {
                if (err) throw err;
                extensionStatus = "OFF";
                console.log("extension" + ": " + extensionStatus);
                return res.render('cp', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
            });
        }
    } else {
        console.log("Nothing To Do ....!!!");
        console.log({
                        "ledStatus": ledStatus,
                        "lightStatus": lightStatus,
                        "fanStatus": fanStatus,
                        "chargerStatus": chargerStatus,
                        "extensionStatus": extensionStatus
                    });
        return res.render('cp.ejs', { "ledStatus": ledStatus, "lightStatus": lightStatus, "fanStatus": fanStatus, "chargerStatus": chargerStatus, "extensionStatus": extensionStatus });
    }
});

app.listen(80, function() {
    console.log('Server Started on Port: 80!');
});
