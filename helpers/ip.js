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



exports.generate_ip_list = function (ip_details) {
    return cidr.list(ip_details['ip']).slice(EXCLUDE_NETWORK_ADDRESS, +ip_details['count'] - EXCLUDE_NETWORK_ADDRESS);
};


exports.read_csv = function (read_file_path) {

    // exclude first row 
    var first_row = true;

    // Get CIDR based on count 
    function get_CIDR(count) {
        return (CIDR_MAX - Math.log2(count))
    }

    // This ip for processing
    var ips = [];

    // Return this ip for HTML rendering
    var render_ips = [];

    // CSV Stream 
    var csv_stream = fs.createReadStream(read_file_path, 'utf-8');

    csv_stream.pipe(csvReaderStream()).on('data', function (row) {
            // console.log(row);
            if (!first_row) {
                ips.push({
                    ip: row[BEGIN_IP] + "/" + get_CIDR(+row[TOTAL_COUNT]),
                    count: +row[TOTAL_COUNT]
                });

                render_ips.push({
                    ip: row[BEGIN_IP],
                    count: row[TOTAL_COUNT]
                });
            }
            first_row = false;
        })
        .on('end', function (data) {
            console.log("FINISHED READING");
        });

    return [{
        'process': ips,
        'render': render_ips
    }];
};