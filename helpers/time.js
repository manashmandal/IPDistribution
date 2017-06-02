// Datetime module 

var datetime = require('node-datetime');

const datetime_format = "d/m/Y H:M:S";

// Returns current time in D/M/Y H:M:S Format
exports.now = function () {
    var dt = datetime.create();
    return dt.format(datetime_format)
};