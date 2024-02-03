import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import doctorRoutes from "./routes/doctors";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/doctors", doctorRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}/`);
});
