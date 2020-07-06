const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');
const Image = require('../models/image-model');

router.get('/images', (req, res, next) => {
	Image.find()
		.then(imagesFromDB => res.status(200).json(imagesFromDB))
		.catch(err => next(err));
});

router.post('/images/create', (req, res, next) => {

	Image.create(req.body)
		.then(newImage => {
			res.status(200).json(newImage);
		})
		.catch(err => next(err));
});


router.post('/upload', uploadCloud.single("imageUrl"), (req, res, next) => {
	res.json({ imageUrl: req.file.secure_url });
})

module.exports = router;
