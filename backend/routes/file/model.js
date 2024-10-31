const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    userProfile: {
        type: String,
        required: true,
    },
});

const File = new mongoose.model('File', fileSchema);

module.exports = File;