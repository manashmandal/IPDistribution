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


// Returns a list of ip within a range 
function get_ip_within_range(begin, end, count){
    count = +count;
    while(count--){
        console.log("fucking awesome");
    }
}



// csv.fromPath(bd_ip_list).on("data", function(data){
//     ping.promise.probe(data[BEGIN_IP]).then(function(res){
//         console.log(res);
//     })
// });

console.log(get_ip_within_range("1.1.10.2", "2..35564", "5"));