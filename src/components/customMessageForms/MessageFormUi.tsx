import {
	PaperAirplaneIcon,
	PaperClipIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone, { FileWithPath } from "react-dropzone";

interface Props {
	setAttachment: React.Dispatch<React.SetStateAction<FileWithPath | null>>;
	message: string;
	appendText?: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageFormUi: React.FC<Props> = ({
	setAttachment,
	message,
	appendText,
	handleChange,
	handleSubmit,
	handleKeyDown,
}) => {
	const [preview, setPreview] = useState("");
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
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder={"Type a message..."}
					/>
					{appendText && (
						<input
							className="message-form-assist"
							type="text"
							disabled={true}
							value={`${message}${appendText}`}
						/>
					)}
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
export default MessageFormUi;
