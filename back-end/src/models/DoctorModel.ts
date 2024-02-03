import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String, required: true },
	phone_number: { type: String, required: false},
	fax_number: { type: String, required: false},
	practice_discipline: { type: [String], required: true },
	gender: { type: String, required: true },
	languages: { type: [String], required: true },
	accepting_patients: { type: Boolean, default: false } 
});

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;
