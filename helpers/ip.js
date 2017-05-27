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



exports.generate_ip_list = function (read_file_path, write_file_path) {
    // CSV Stream 
    var csv_stream = fs.createReadStream(read_file_path, 'utf-8');

    var ip_count_dict = [];
    var ip_list = [];

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


    function generate_csv(generated_ip_list, filepath) {
        // Store the IP Addresses as 2D
        var ip_matrix = [];

        // Adding all ip
        generated_ip_list.forEach(function (ip) {
            ip_matrix.push([ip]);
        });

        // Adding Header to the CSV
        ip_matrix.unshift(["ip_address"]);

        // Writing the csv file 
        csv_writer.writeToPath(filepath, ip_matrix, {
            headers: true
        }).on('finish', function () {
            console.log("Finished Writing the CSV File");
        });
    }

    // Load each row after finished reading write in a file 
    csv_stream.pipe(csvReaderStream()).on('data', function (row) {
            ip_count_dict.push({
                'ip': "" + row[BEGIN_IP],
                'count': "" + row[TOTAL_COUNT]
            });
        })
        .on('end', function (data) {
            console.log("FINISHED READING");
            // Finally generate all ips 
            ip_count_dict.slice(1, ip_count_dict.length).forEach(function (ip) {
                var generated_ip_from_range = get_valid_ip_list(ip['ip'], ip['count']);
                ip_list = ip_list.concat(generated_ip_from_range);
            });

            generate_csv(ip_list, write_file_path);
        });

};