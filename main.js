var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;

const root = __dirname;

// Ip list 
const bd_ip_list = root + '\\files\\bd_ip_list.csv';



// valid_ip_list.forEach(function (ip) {
//     ping.promise.probe(ip).then(function (res) {
//         console.log(res);
//     });
// });



// ip(bd_ip_list);
hello();