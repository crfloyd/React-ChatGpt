import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import { useEffect, useState } from "react";

interface LoginProps {
	setUser: (user: string) => void;
	setSecret: (secret: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUser, setSecret }) => {
	const [isRegister, setIsRegistered] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [triggerLogin, resultLogin] = usePostLoginMutation();
	const [triggerSignup] = usePostSignUpMutation();

	const handleLogin = () => {
		triggerLogin({ username, password });
	};

	const handleRegister = () => {
		triggerSignup({ username, password });
	};

	useEffect(() => {
		if (resultLogin.data?.response) {
			setUser(username);
			setSecret(password);
		}
	}, [resultLogin.data]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="login-page">
			<div className="login-container">
				<h2 className="title">CHATGPT APP</h2>
				<p
					className="register-change"
					onClick={() => setIsRegistered(!isRegister)}
				>
					{isRegister ? "Already have an account?" : "Don't have an account?"}
				</p>
				<div>
					<input
						type="text"
						className="login-input"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						className="login-input"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="login-actions">
					{isRegister ? (
						<button type="button" onClick={handleRegister}>
							Register
						</button>
					) : (
						<button type="button" onClick={handleLogin}>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default Login;
