const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema ( {
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    colour: String

}, { timestamps: true }

)


module.exports = mongoose.model('Task', taskSchema);