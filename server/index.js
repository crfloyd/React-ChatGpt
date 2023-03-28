import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import { Configuration, OpenAIApi } from "openai";
import openaiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

// Configure
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// OpenAI configuration
const configuration = new Configuration({
	apiKey: process.env.OPEN_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// Routes
app.use("/openai", openaiRoutes);
app.use("/auth", authRoutes);

// Server setup
const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.log(`Server running on: http://localhost:${port}`);
});
