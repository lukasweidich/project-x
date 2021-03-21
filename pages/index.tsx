import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../actions/authActions";
import useAuth from "../hooks/useAuth";
import { CookieNames } from "../utils/constants";
import { saveCookie } from "./../utils/cookies";
import Link from "next/link";
const { COOKIE_CONSENT } = CookieNames;

const login = () => {
	const { user, token } = useAuth();
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		saveCookie(COOKIE_CONSENT, rememberMe, rememberMe);
		dispatch(logIn(username, password));
	};

	const handleLogOut = () => {
		dispatch(logOut());
	};

	return (
		<div>
			{user ? (
				<>
					<h2>Hi, {user.firstName}!</h2>
					<p>This is your access token: {token}.</p>
					<button onClick={handleLogOut}>Log Out</button>
					<Link href="/secret">
						<a>To protected route</a>
					</Link>
					<Link href="/admin">
						<a>To admin route</a>
					</Link>
				</>
			) : (
				<form onSubmit={handleLogIn}>
					<input
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span>
						<input
							type="checkbox"
							checked={rememberMe}
							onChange={() => setRememberMe(!rememberMe)}
						/>{" "}
						Remember me
					</span>
					<button type="submit">Log In</button>
				</form>
			)}
		</div>
	);
};

export default login;
