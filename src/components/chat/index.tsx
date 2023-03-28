import {
	useMultiChatLogic,
	MultiChatSocket,
	MultiChatWindow,
} from "react-chat-engine-advanced";
import CustomHeader from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";

const Chat = () => {
	const chatProps = useMultiChatLogic(
		import.meta.env.VITE_PROJECT_ID,
		"test",
		"test123"
	);
	return (
		<div style={{ flexBasis: "100%" }}>
			<MultiChatSocket {...chatProps} />
			<MultiChatWindow
				{...chatProps}
				style={{ height: "100vh" }}
				renderChatHeader={(chat) => <CustomHeader headerProps={chat} />}
				renderMessageForm={(props) => {
					if (chatProps.chat?.title.startsWith("AiChat_")) {
						return <Ai props={props} activeChat={chatProps.chat} />;
					}
					return (
						<StandardMessageForm props={props} activeChat={chatProps.chat} />
					);
				}}
			/>
		</div>
	);
};
export default Chat;
