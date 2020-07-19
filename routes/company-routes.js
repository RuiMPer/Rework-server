//1.create, edit, delete
//2.show company
//3.show all
//

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
		.populate('services')
		.then((Company) => {
			res.json(Company);
		})
		.catch((err) => {
			// will do something else
			res.json(err);
		});
});

// POST route => to create a new Company
router.post("/company", (req, res) => {
	const { title, description, phone, service, logoPath, logoName, admins, workers } = req.body;
	Company.create({
		title,
		description,
		phone,
		logoPath,
		logoName,
		service,
		admins, //precisamos de ir buscar o id de quem está a criar
		workers,
		verified: false
	}).then(response => {
		User.findByIdAndUpdate(req.body.admins, {
			$push: { company: response._id },
		})
			.then((response) => {
				res.json({ message: `Company ${response._id} was created succesfully` });
			})
			.catch((err) => {
				// will do something else
				res.json(err);
			});
	})
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