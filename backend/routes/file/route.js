require('dotenv').config();
var express = require('express');
var router = express.Router();
var upload = require('../../middlewares/multerServices');
var File = require("./model")

let imgUpload = upload("userProfile").fields([
    { name: "userProfile", maxCount: 1 },
]);

router.post('/upload', imgUpload, async (req, res) => {
    try {
        console.log("Middleware working")
        const { files } = req;

        const userProfile = files.userProfile[0].filename;
        console.log("🚀 userProfile:", userProfile)

        const Uploadedfile = await File.create({ userProfile });
        res.status(201).json({ result: "true", Uploadedfile });
    } catch (error) {
        res.status(500).json({ result: "false", message: "internal server error" });
    }
});

router.get('/uploaded-img', async (req, res, next) => {
    try {
        const allData = await File.find({});
        console.log("result >>>", allData);
        res.status(200).json({ result: "true", images: allData });
    } catch (error) {
        res.status(500).json({ result: "false", message: "Internal server error" });
    }
});

module.exports = router;
