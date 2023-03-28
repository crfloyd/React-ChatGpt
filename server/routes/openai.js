import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
	try {
		const { text, id } = req.body;

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
				{ role: "user", content: text }, // the message that the user sends
			],
		});

		const aiResponseText = response.data.choices[0].message.content;
		console.log("openAI response:", aiResponseText);

		await axios.post(
			`https://api.chatengine.io/chats/${id}/messages/`,
			{ text: aiResponseText },
			{
				headers: {
					"Project-ID": process.env.PROJECT_ID,
					"User-Name": process.env.BOT_USER_NAME,
					"User-Secret": process.env.BOT_USER_SECRET,
				},
			}
		);

		res.status(200).json({ text: response.data.choices[0].message.content });
	} catch (error) {
		console.error("error", error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
