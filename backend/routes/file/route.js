
var express = require('express');
var router = express.Router();
var upload = require('../../middlewares/multerServices');

let imgUpload = upload("userProfile").fields([
    { name: "userProfile", maxCount: 1 },
]);

router.post('/upload', imgUpload, (req, res) => {
    res.send('Upload successful!');
    console.log(req.file, req.body);
});

module.exports = router;
