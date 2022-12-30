const { Schema, model } = require('mongoose')

const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const File = model('File', FileSchema)

module.exports = File