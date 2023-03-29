const mongoose = require('mongoose');
const baitapSchema = new mongoose.Schema({
    albumID: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    thumnailUrl: {
        type: String,
    }
});
const baitap = new mongoose.model('baitap', baitapSchema);
module.exports = baitap;