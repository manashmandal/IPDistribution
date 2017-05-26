//Imports
var CIDR = require('cidr-js');
var cidr = CIDR();
var csv = require('fast-csv');

//Indices 
const SERIAL = 0;
const BEGIN_IP = 1;
const END_IP = 2;
const TOTAL_COUNT = 3;
const CIDR_MAX = 32;
const EXCLUDE_NETWORK_ADDRESS = 1;

exports.generate_ip_list = function (csv_file_path) {

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

    // Iterate the bd ip list 
    csv.fromPath(csv_file_path).on("data", function (data) {
        console.log(data[BEGIN_IP] + " " + data[TOTAL_COUNT]);
    });

};

// Generate CSV file 
exports.generate_csv = function (generated_ip_list) {
    // var valid_ip_matrix = [];

    // // Convert 1D array to 2D
    // valid_ip_list.forEach(function (ip) {
    //     valid_ip_matrix.push([ip]);
    // });

    // Add Header
    // valid_ip_matrix.unshift(["ip_address"]);

    // Write file 
    // csv
    //     .writeToPath("files//my.csv", valid_ip_matrix, {
    //         headers: true
    //     })
    //     .on("finish", function () {
    //         console.log("done!");
    //     });

};