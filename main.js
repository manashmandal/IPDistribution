var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;
var fs = require('fs');
var express = require('express');
var app = express();
const path = require("path");

const root = __dirname;

// IP CSV file read, write path  
const read_ip_path = root + '\\files\\bd_ip_list.csv';
const write_ip_path = root + '\\files\\all_ip.csv';

// Set view enine 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));
app.use(express.static('public'))

// Do this only once!
if (fs.existsSync(write_ip_path)) {
    console.log("FILE EXISTS [NO NEED TO WRITE AGAIN]");
} else {
    console.log("FILE DOESN'T EXIST, WRITING....");
    gen_ip(read_ip_path, write_ip_path);
}

app.get('/:user', function (req, res) {
    res.render("homepage", {
        user: req.params.user
    });
});

app.get('/', function (req, res) {
    res.render("homepage");
})

app.listen(8000);