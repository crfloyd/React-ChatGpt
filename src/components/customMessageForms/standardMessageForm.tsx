import { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import { FileWithPath } from "react-dropzone";
import MessageFormUi from "@/components/customMessageForms/MessageFormUi";

interface Props {
	props: MessageFormProps;
	activeChat?: ChatObject;
}

const StandardMessageForm: React.FC<Props> = ({ props, activeChat }) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<FileWithPath | null>(null);

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
		onSubmit({
			attachments: at,
			created: date,
			sender_username: props.username ?? "",
			text: message,
			id: activeChat?.id,
			custom_json: "",
		});
		setMessage("");
		setAttachment(null);
	};

	return (
		<MessageFormUi
			setAttachment={setAttachment}
			message={message}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};
export default StandardMessageForm;
