import React from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "../utils/auth/pageAuth";

export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[],
);

const secret = ({ user: userString, token }) => {
	const user: UserInterface = JSON.parse(userString);
	return (
		<>
			<h3>Good to see you, {user.firstName}!</h3>
			<p>This route can only be accessed when logged in.</p>
		</>
	);
};

export default secret;
