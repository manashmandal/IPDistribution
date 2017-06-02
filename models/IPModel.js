var mongoose = require('mongoose');
const doc_name = 'ip_db';

var IPSchema = new mongoose.Schema({
    id: {
        type: String
    },

    data: [{
        host: {
            type: String
        },
        timestamp: {
            type: Date
        },
        alive: {
            type: Boolean
        },
        output: {
            type: String
        },

        time: {
            type: Number
        },

        min: {
            type: Number
        },

        max: {
            type: Number
        },

        avg: {
            type: Number
        },

        stddev: {
            type: Number
        },

        numeric_host: {
            type: String
        }
    }]
});

var IP = mongoose.model('IP', IPSchema, doc_name);

module.exports = {
    IP: IP
}