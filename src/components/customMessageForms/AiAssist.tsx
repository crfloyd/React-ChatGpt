import MessageFormUi from "@/components/customMessageForms/MessageFormUi";
import { usePostAiCodeMutation, usePostAiAssistMutation } from "@/state/api";
import { useEffect, useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import { FileWithPath } from "react-dropzone";

interface Props {
	props: MessageFormProps;
	activeChat?: ChatObject;
}

function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [delay, value]);

	return debouncedValue;
}

const AiAssist: React.FC<Props> = ({ props, activeChat }) => {
	const [message, setMessage] = useState("");
	const [appendText, setAppendText] = useState("");
	const [attachment, setAttachment] = useState<FileWithPath | null>(null);

	const [trigger, resultAssist] = usePostAiAssistMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMessage(e.target.value);

	const handleSubmit = async () => {
		const { onSubmit } = props;
		if (!onSubmit) return;
		const date = new Date()
			.toISOString()
			.replace("T", " ")
			.replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
		const at = attachment
			? [
					{
						blob: attachment,
						file: attachment.name,
						id: attachment.size,
						created: attachment.lastModified.toString(),
					},
			  ]
			: [];
		const form = {
			attachments: at,
			created: date,
			sender_username: props.username ?? "",
			text: message,
			id: activeChat?.id,
			custom_json: "",
		};
		onSubmit(form);
		setMessage("");
		setAttachment(null);
	};

	const debouncedValue = useDebounce(message, 1000);

	useEffect(() => {
		if (debouncedValue) {
			const form = { text: message };
			trigger(form);
		}
	}, [debouncedValue]); //eslint-disable-line

	const handleKeyDown = (e: {
		keyCode: number;
		preventDefault: () => void;
	}) => {
		// handle enter and tab key
		if (e.keyCode === 13 || e.keyCode === 9) {
			e.preventDefault();
			setMessage(`${message}${appendText}`);
		}
		setAppendText("");
	};

	useEffect(() => {
		if (resultAssist.data?.text) {
			setAppendText(resultAssist.data.text);
		}
	}, [resultAssist.data?.text]); //eslint-disable-line

	return (
		<MessageFormUi
			setAttachment={setAttachment}
			message={message}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			appendText={appendText}
			handleKeyDown={handleKeyDown}
		/>
	);
};
export default AiAssist;
