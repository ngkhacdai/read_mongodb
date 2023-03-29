const mongoose = require('mongoose');
const XeHoiSchema = new mongoose.Schema({
    ten: {
        type: String,
        require: true,
    },
    nam: {
        type: Number,
    },
    giaban: {
        type: Number,
        default: 0,
    }
});
const xeHoiModel = new mongoose.model('xehoi', XeHoiSchema);
module.exports = xeHoiModel;