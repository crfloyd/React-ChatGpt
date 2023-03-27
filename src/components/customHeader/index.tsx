import { ChatHeaderProps } from "react-chat-engine-advanced";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";

interface Props {
	headerProps: ChatHeaderProps;
}

const CustomHeader: React.FC<Props> = ({ headerProps }) => {
	return (
		<div className="chat-header">
			<div className="flexbetween">
				<ChatBubbleLeftRightIcon className="icon-chat" />
				<h3 className="header-text">{headerProps.title}</h3>
			</div>
			<div className="flexbetween">
				<PhoneIcon className="icon-phone" />
				{headerProps.description !== "⬅️ ⬅️ ⬅️" ? (
					<p className="header-text">{headerProps.description}</p>
				) : (
					<p className="header-text">No chat selected</p>
				)}
			</div>
		</div>
	);
};
export default CustomHeader;
