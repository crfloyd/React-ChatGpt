import { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";

interface Props {
	props: MessageFormProps;
	activeChat?: ChatObject;
}

const StandardMessageForm: React.FC<Props> = ({ props, activeChat }) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState("");
	const [preview, setPreview] = useState("");

	return <div>standardMessageForm</div>;
};
export default StandardMessageForm;
