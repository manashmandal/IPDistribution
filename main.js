var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;
var read_csv = require('./helpers/ip').read_csv;
var fs = require('fs');
var express = require('express');
var app = express();
const path = require("path");
var bodyParser = require('body-parser');
var IPModel = require('./models/IPModel').IP;
var mongoose = require('mongoose');

// Port number
const PORT = 8000;

// Creating db instance
var db = mongoose.connection;

// Loading config vars
const connection_url = require('./config').mongo_connection_url;

const root = __dirname;

// IP CSV file read, write path
const ip_path = root + "/files/bd_ip_list.csv";

// Set view enine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Load all ip details
var _ip = read_csv(ip_path);

// Distribute ips accross rendering and processing purpose
var ip_ = _ip['process'];
var ip_renders = _ip['render'];


// Ping an ip address
// ping.promise.probe(host).then(function (res) {
//     console.log(res);
// });

// Connect to MongoDB
mongoose.connect(connection_url);

// Adding the routes
require('./routes')(app, IPModel, ip_renders);


app.listen(PORT);
console.log("Started listening to : " + PORT);
