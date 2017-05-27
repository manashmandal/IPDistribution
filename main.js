var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;
var gen_csv = require('./helpers/ip').generate_csv;

const root = __dirname;

// Ip list 
const bd_ip_list = root + '\\files\\bd_ip_list.csv';
const all_ip_write_path = './files/all_ip.csv';



// valid_ip_list.forEach(function (ip) {
//     ping.promise.probe(ip).then(function (res) {
//         console.log(res);
//     });
// });

console.log(gen_ip(bd_ip_list));