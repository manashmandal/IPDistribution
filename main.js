var ping = require('ping');
var gen_ip = require('./helpers/ip').generate_ip_list;
var fs = require('fs');

const root = __dirname;

// IP CSV file read, write path  
const read_ip_path = root + '\\files\\bd_ip_list.csv';
const write_ip_path = root + '\\files\\all_ip.csv';


// Do this only once!
if (fs.existsSync(write_ip_path)) {
    console.log("FILE EXISTS [NO NEED TO WRITE AGAIN]");
} else {
    console.log("FILE DOESN'T EXIST, WRITING....");
    gen_ip(read_ip_path, write_ip_path);
}