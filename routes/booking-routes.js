const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Service = require("../models/servicemodel");
const Booking = require("../models/bookingmodel");

//API Calendar + model bookings
//worker fazer marcações + client tb !!!!!!
//worker PODE criar cliente

/*
  title: String,
  description: String,
  date: Date,
  time: String,
  service: { type: Schema.Types.ObjectId, ref: 'Service' },
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  confirmationStatus: Boolean, //autorização por parte do worker "true/false"
  logStatus: String, //pago, presença do cliente, atraso do cliente -> SEPARAR?
  rating: Number //https://reviewapi3.docs.apiary.io/#reference/0/review-api
*/

// GET route => to retrieve a specific route
router.get("/bookings/:id", (req, res) => {
	Booking.findById(req.params.id)
		.then((Booking) => {
			res.json(Booking);
		})
		.catch((err) => {
			// will do something else
			res.json(err);
		});
});

// POST route => to create a new Booking
router.post("/bookings", (req, res) => {
	const { title, description, date, time } = req.body;
	Booking.create({
		title,
		description,
		date,
		time,
		confirmationStatus: true,
		logStatus: ["unpaid", "not present", "not delay"],
	})
		.then((response) => {
			Service.findByIdAndUpdate(req.body.service, {
				$push: { bookings: response._id },
			}).then((response) => {
				res.json(response);
			});
		})
		.catch((err) => {
			// will do something else
			res.json(err);
		});
});

// Update Route => to update a specific Booking
router.put("/bookings/:id", (req, res) => {
	Booking.findByIdAndUpdate(req.params.id, req.body)
		.then((response) => {
			// console.log("response", response);
			res.json({ message: `Booking ${response} was updated succesfully` });
		})
		.catch((error) => {
			res.json(error);
		});
});

// DELETE route => to delete a specific project
router.delete("/bookings/:id", (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: "Specified id is not valid" });
	}

	Booking.findByIdAndDelete(req.params.id)
		.then((response) => {
			Service.findByIdAndUpdate(req.body.service, {
				$pull: { bookings: req.params.id },
			})
				.then(() => {
					res.json({ message: `Booking deleted! ${response._id}` });
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
