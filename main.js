var ping = require('ping');

// var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

// hosts.forEach(function (host) {
//     ping.promise.probe(host)
//         .then(function (res) {
//             console.log(res);
//         });
// });

const root = __dirname;

// Ip list 
const bd_ip_list = root + '\\files\\bd_ip_list.csv';
var csv = require('fast-csv');

//Indices 
const SERIAL = 0;
const BEGIN_IP = 1;
const END_IP = 2;
const TOTAL_COUNT = 3;
const CIDR_MAX = 32;
const EXCLUDE_NETWORK_ADDRESS = 1;


// Returns a list of ip within a range 
function get_ip_within_range(begin, end, count) {
    count = +count;
    while (count--) {
        // Calculate IP addresses here 
    }
}

// Returns CIDR for a given ip count 
function get_CIDR(count) {
    return (CIDR_MAX - Math.log2(count))
}

// Returns list of valid ip
function get_valid_ip_list(start_ip, count) {
    var _cidr = get_CIDR(+count);
    var query_ip = start_ip + "/" + _cidr;
    return cidr.list(query_ip).slice(EXCLUDE_NETWORK_ADDRESS, count - EXCLUDE_NETWORK_ADDRESS);
}

// csv.fromPath(bd_ip_list).on("data", function (data) {
//     ping.promise.probe(data[BEGIN_IP]).then(function (res) {
//         console.log(res);
//     })
// });

var start_ip = "82.206.169.0";
var total_count = "80";



// console.log(get_ip_within_range("1.1.10.2", "1.1.10.5", "5"));

var CIDR = require('cidr-js');
var cidr = new CIDR();

var block = "14.1.100.0/22";

var results = cidr.list(block);

// results.forEach(function (host) {
//     ping.promise.probe(host).then(function (res) {
//         console.log(res);
//     });
// });

// console.log(get_valid_ip_list(start_ip, total_count))

var valid_ip_list = get_valid_ip_list(start_ip, total_count);

// valid_ip_list.forEach(function (ip) {
//     ping.promise.probe(ip).then(function (res) {
//         console.log(res);
//     });
// });

var valid_ip_matrix = [];

// Convert 1D array to 2D
valid_ip_list.forEach(function (ip) {
    valid_ip_matrix.push([ip]);
});

// Add Header
valid_ip_matrix.unshift(["ip_address"]);

// Write file 
csv
    .writeToPath("files//my.csv", valid_ip_matrix, {
        headers: true
    })
    .on("finish", function () {
        console.log("done!");
    });