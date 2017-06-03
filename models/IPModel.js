var mongoose = require('mongoose');
const collection_name = require('../config').collection_name;

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

// Creating the Model 
var IP = mongoose.model('IP', IPSchema, collection_name);

module.exports = {
    IP: IP
}