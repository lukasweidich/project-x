import React from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "../utils/auth/pageAuth";

export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[(user) => user.isAdmin],
);

const admin = ({ user: userString, token }) => {
	const user: UserInterface = JSON.parse(userString);
	return <div>Congratulations, {user.firstName}: you are an admin.</div>;
};

export default admin;
