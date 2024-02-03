import express from "express";
import DoctorModel from "../models/DoctorModel";

const router = express.Router();

// POST method to add a new doctor
router.post("/", async (req, res) => {
	try {
		const newDoctor = new DoctorModel(req.body);
		const savedDoctor = await newDoctor.save();
		res.status(201).json(savedDoctor);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// GET method to get all doctors
router.get("/", async (req, res) => {
	try {
		const doctors = await DoctorModel.find();
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// GET method to get doctors by language
router.get("/language/:language", async (req, res) => {
	const { language } = req.params;

	try {
		const doctors = await DoctorModel.find({ languages: language });
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
