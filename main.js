var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;
var read_csv = require('./helpers/ip').read_csv;
var fs = require('fs');
var express = require('express');
var app = express();
const path = require("path");
var bodyParser = require('body-parser');

const root = __dirname;

// IP CSV file read, write path  
const ip_path = root + "\\files\\bd_ip_list.csv";

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

app.get('/:user', function (req, res) {
    res.render("homepage", {
        user: req.params.user
    });
});

app.get('/ips/iplist', function (req, res) {
    res.render('iplist', {
        ip_list: ip_renders,
        title_placeholder: "Available IPs"
    });
});

app.get('/', function (req, res) {
    res.render("homepage", {
        title_placeholder: "IP Distribution | Node App"
    });
});


app.post('/button_click', function (req, res) {
    // console.log(req.body);
    // res.send(200);
    console.log("BUTTON CLICK");
    res.send(200);
});



app.listen(8000);