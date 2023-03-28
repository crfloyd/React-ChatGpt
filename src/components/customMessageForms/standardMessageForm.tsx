import {
	PaperAirplaneIcon,
	PaperClipIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import Dropzone, { FileWithPath } from "react-dropzone";

interface Props {
	props: MessageFormProps;
	activeChat?: ChatObject;
}

const StandardMessageForm: React.FC<Props> = ({ props, activeChat }) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<FileWithPath | null>(null);
	const [preview, setPreview] = useState("");

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
		<div className="message-form-container">
			{preview && (
				<div className="message-form-preview">
					<img
						className="message-form-preview-image"
						alt="message-form-preview"
						src={preview}
						onLoad={() => {
							URL.revokeObjectURL(preview);
						}}
					/>
					<XMarkIcon
						className="message-form-icon-x"
						onClick={() => {
							setPreview("");
							setAttachment(null);
						}}
					/>
				</div>
			)}
			<div className="message-form">
				<div className="message-form-input-container">
					<input
						className="message-form-input"
						type={"text"}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder={"Type a message..."}
					/>
				</div>
				<div className="message-form-icons">
					<Dropzone
						accept={{
							"image/*": [".png", ".gif", ".jpeg", ".jpg"],
						}}
						multiple={false}
						noClick={true}
						onDrop={(acceptedFiles: any) => {
							const file = acceptedFiles[0];
							setAttachment(file);
							setPreview(URL.createObjectURL(file));
						}}
					>
						{({ getRootProps, getInputProps, open }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<PaperClipIcon
									className="message-form-icon-clip"
									onClick={open}
								/>
							</div>
						)}
					</Dropzone>
					<hr className="vertical-line" />
					<PaperAirplaneIcon
						className="message-form-icon-airplane"
						onClick={() => {
							setPreview("");
							handleSubmit();
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default StandardMessageForm;
