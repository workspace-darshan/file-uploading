const path = require('path');
const fs = require('fs');
const multer = require('multer');
const imgPath = process.env.IMG_PATH;

// Configure multer storage with dynamic folder creation
const storage = (folderPath) => multer.diskStorage({
    destination: (req, file, cb) => {
        const destPath = path.join(imgPath, folderPath);
        // Create directory if it doesn't exist
        fs.mkdir(destPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, destPath);
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// The function to create the upload middleware
const upload = (folderPath) => {
    return multer({ storage: storage(folderPath) });
};

module.exports = upload;