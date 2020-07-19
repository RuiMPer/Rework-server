const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');


router.post('/upload', uploadCloud.single("photoPath"), (req, res, next) => {
	console.log("REQ FILE", req.file)
	res.json({ photoPath: req.file.secure_url});
})

module.exports = router;
