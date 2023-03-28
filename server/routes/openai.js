import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";
import beautify from "js-beautify";

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

		let aiResponseText = response.data.choices[0].message.content;
		// console.log("openAI chat response:", aiResponseText);

		const date = new Date()
			.toISOString()
			.replace("T", " ")
			.replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
		await axios.post(
			`https://api.chatengine.io/chats/${id}/messages/`,
			{ text: aiResponseText, created: date },
			{
				headers: {
					"Project-ID": process.env.PROJECT_ID,
					"User-Name": process.env.BOT_USER_NAME,
					"User-Secret": process.env.BOT_USER_SECRET,
				},
			}
		);

		res.status(200).json({ text: aiResponseText });
	} catch (error) {
		console.error("error", error);
		res.status(500).json({ error: error.message });
	}
});

router.post("/code", async (req, res) => {
	try {
		const { text, id } = req.body;

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are an assistant coder who responds with only code and no explanations.",
				}, // this represents the bot and what role they will assume
				{ role: "user", content: text }, // the message that the user sends
			],
		});

		let aiResponseText = response.data.choices[0].message.content;
		// console.log("openAI code response:", aiResponseText);

		console.log("before", aiResponseText);
		if (aiResponseText.includes("```")) {
			aiResponseText = aiResponseText.substring(
				aiResponseText.indexOf("```") + 3,
				aiResponseText.lastIndexOf("```")
			);
			console.log("after substring", aiResponseText);
		}
		const formatted = beautify.js_beautify(aiResponseText, {
			indent_size: 2,
			space_in_empty_paren: true,
		});
		console.log("after", formatted);

		const date = new Date()
			.toISOString()
			.replace("T", " ")
			.replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
		await axios.post(
			`https://api.chatengine.io/chats/${id}/messages/`,
			{ text: formatted, created: date },
			{
				headers: {
					"Project-ID": process.env.PROJECT_ID,
					"User-Name": process.env.BOT_USER_NAME,
					"User-Secret": process.env.BOT_USER_SECRET,
				},
			}
		);

		res.status(200).json({ text: formatted });
	} catch (error) {
		console.error("error", error);
		res.status(500).json({ error: error.message });
	}
});

router.post("/assist", async (req, res) => {
	try {
		const { text } = req.body;

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that serves to only complete user's thoughts or sentences.",
				}, // this represents the bot and what role they will assume
				{ role: "user", content: `Finish my thought: ${text}` }, // the message that the user sends
			],
		});

		res.status(200).json({ text: response.data.choices[0].message.content });
	} catch (error) {
		console.error("error", error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
