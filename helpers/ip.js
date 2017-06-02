//Constants  
const SERIAL = 0;
const BEGIN_IP = 1;
const END_IP = 2;
const TOTAL_COUNT = 3;
const CIDR_MAX = 32;
const EXCLUDE_NETWORK_ADDRESS = 1;


//Imports
var CIDR = require('cidr-js');
var cidr = CIDR();
var csv_writer = require('fast-csv');
var csvReaderStream = require('csv-reader');
var fs = require('fs');



exports.generate_ip_list = function (ip_cidr) {
    // CSV Stream 
    var csv_stream = fs.createReadStream(read_file_path, 'utf-8');

    var ip_count_dict = [];
    var ip_list = [];



    // Returns list of valid ip
    function get_valid_ip_list(start_ip, count) {
        var _cidr = get_CIDR(+count);
        var query_ip = start_ip + "/" + _cidr;
        return cidr.list(query_ip).slice(EXCLUDE_NETWORK_ADDRESS, count - EXCLUDE_NETWORK_ADDRESS);
    }



};


exports.read_csv = function (read_file_path) {

    // exclude first row 
    var first_row = true;

    // Get CIDR based on count 
    function get_CIDR(count) {
        return (CIDR_MAX - Math.log2(count))
    }

    var ips = [];
    // CSV Stream 
    var csv_stream = fs.createReadStream(read_file_path, 'utf-8');

    csv_stream.pipe(csvReaderStream()).on('data', function (row) {
            // console.log(row);
            if (!first_row) {
                ips.push({
                    ip: row[BEGIN_IP] + "/" + get_CIDR(+row[TOTAL_COUNT]),
                    count: +row[TOTAL_COUNT]
                });
            }
            first_row = false;
        })
        .on('end', function (data) {
            console.log("FINISHED READING");
        });

    return ips;
};