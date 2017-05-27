//Constants  
const SERIAL = 0;
const BEGIN_IP = 1;
const END_IP = 2;
const TOTAL_COUNT = 3;
const CIDR_MAX = 32;
const EXCLUDE_NETWORK_ADDRESS = 1;
const IP_LIST_CSV_PATH = "E:\\IPDistribution\\files\\bd_ip_list.csv";


//Imports
var CIDR = require('cidr-js');
var cidr = CIDR();
var csv_writer = require('fast-csv');
var csvReaderStream = require('csv-reader');
var fs = require('fs');

var csv_stream = fs.createReadStream(IP_LIST_CSV_PATH, 'utf-8');





exports.generate_ip_list = function (csv_file_path) {
    var ip_count_dict = [];

    // Get CIDR based on count 
    function get_CIDR(count) {
        return (CIDR_MAX - Math.log2(count))
    }

    // Returns list of valid ip
    function get_valid_ip_list(start_ip, count) {
        var _cidr = get_CIDR(+count);
        var query_ip = start_ip + "/" + _cidr;
        return cidr.list(query_ip).slice(EXCLUDE_NETWORK_ADDRESS, count - EXCLUDE_NETWORK_ADDRESS);
    }

    // Load each row 
    csv_stream.pipe(csvReaderStream()).on('data', function (row) {
            ip_count_dict.push({
                'ip': row[BEGIN_IP],
                'count': row[TOTAL_COUNT]
            });
        })
        .on('end', function (data) {
            console.log("FINISHED");
            console.log(ip_count_dict);
        });

};

// Generate CSV file 
exports.generate_csv = function (generated_ip_list, filepath) {
    // Store the IP Addresses as 2D
    var ip_matrix = [];

    // Adding all ip
    generated_ip_list.forEach(function (ip) {
        ip_matrix.push([ip]);
    });

    // Adding Header to the CSV
    ip_matrix.unshift(["ip_address"]);

    // Writing the csv file 
    csv.writeToPath(filepath, ip_matrix, {
        headers: true
    }).on('finish', function () {
        console.log("Finished Writing the CSV File");
    });
};