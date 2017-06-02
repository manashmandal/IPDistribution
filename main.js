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
const read_ip_path = root + '\\files\\bd_ip_list.csv';
const write_ip_path = root + '\\files\\all_ip.csv';
const ip_path = root + "\\files\\bd_ip_list.csv";

// Set view enine 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var placeholder = [];
placeholder = read_csv(read_ip_path, placeholder);

// Do this only once!
if (fs.existsSync(write_ip_path)) {
    console.log("FILE EXISTS [NO NEED TO WRITE AGAIN]");
} else {
    console.log("FILE DOESN'T EXIST, WRITING....");
    gen_ip(read_ip_path, write_ip_path);
}

// Ping an ip address 
// ping.promise.probe(host).then(function (res) {
//     console.log(res);
// });

app.get('/:user', function (req, res) {
    res.render("homepage", {
        user: req.params.user
    });
});

app.get('/', function (req, res) {
    res.render("homepage");
});


app.post('/button_click', function (req, res) {
    // console.log(req.body);
    // res.send(200);
    console.log("BUTTON CLICK");
    console.log(placeholder);
    res.send(200);
});



app.listen(8000);