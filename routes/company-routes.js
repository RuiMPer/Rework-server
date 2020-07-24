
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../models/company-model");
const Service = require("../models/service-model")
const User = require("../models/user-model")

// GET route => show all companies
router.get('/company', (req, res) => {
	// Gets data from mongoDB
	Company.find()
		.then(allCompanies => {
			// will do something with the result
			res.json(allCompanies);
		})
		.catch(err => {
			// will do something else
			res.json(err);
		})
});


// GET route => to retrieve a specific company
router.get("/company/:id", (req, res) => {
	Company.findById(req.params.id)
		//.populate('service')
		.then((response) => {
			console.log(response)
			res.json(response);
			
		})
		.catch((err) => {
			// will do something else
			res.json(err);
		});
});

// POST route => to create a new Company
router.post("/company", (req, res) => {
	console.log('REQ USER',req.user);
	console.log("req session user", req.session.user);
	console.log("req session", req.session);

	//const logoPath = 'https://www.pharmamirror.com/wp-content/themes/fox/images/placeholder.jpg';
	//let logoPath = 'https://www.childhood.org.au/app/uploads/2017/07/ACF-logo-placeholder.png';
	let { title,
			logoName,
			logoPath,
			locationPin,
			phone,
			verified, 
			companyProof,
			isAdmin } = req.body;

	let admins, workers;

	
	if(isAdmin=="Eu próprio"){
		admins=[];
		workers=[];
		admins.push(req.user._id);
		workers.push(req.user._id);
	}
	else{
		workers=[];
		workers.push(req.user._id);
	}

	Company.create({
		title,
		logoPath,
		logoName,
		locationPin,
		phone,
		admins,
		workers,
		companyProof,
		verified
	}).then(response => {
		User.findByIdAndUpdate(req.user, {
			$push: { company: response._id },
		})
		res.json({ message: `Company ${response._id} was created succesfully` , response});
		
	}).catch((err) => {
		// will do something else
		res.json(err);
	});
});

// Update Route => to update a company
router.put("/company/:id", (req, res) => {
	Company.findByIdAndUpdate(req.params.id, req.body)
		.then((response) => {
			// console.log("response", response);
			res.json({ message: `Company ${response.title} was updated succesfully` });
		})
		.catch((error) => {
			res.json(error);
		});
});

// DELETE route => to delete a company
router.delete("/company/:id", (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: "Specified id is not valid" });
	}

	Company.findByIdAndDelete(req.params.id)
		.then((response) => {
			Service.findByIdAndUpdate(req.body.service, {
				$pull: { company: req.params.id },
			})
				.then(() => {
					res.json({ message: `Company deleted! ${response._id}` });
				})
				.catch((error) => {
					res.status(500).json({ message: `Error occurred: ${error}` });
				});
		})
		.catch((error) => {
			res.status(500).json({ message: `Error occurred: ${error}` });
		});
});

module.exports = router;