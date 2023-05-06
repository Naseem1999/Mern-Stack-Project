const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Notesschema = new schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
       
    },
    tag: {
        type: String,
        default: "general"

    },
    date: {
        type: Date,
        default: Date.now
    }
})
const notes = mongoose.model('notes', Notesschema);
module.exports = notes;