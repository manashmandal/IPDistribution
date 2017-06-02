var mongoose = require('mongoose');

var IPSchema = new mongoose.Schema({
    id: {
        type: String,
        index: true
    },

    data: {

    }
});