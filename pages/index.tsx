import { Button } from "@chakra-ui/button";
import React from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "../utils/auth/pageAuth";
import { useDispatch } from "react-redux";
import { logOut } from "../actions/authActions";
import { useRouter } from "next/router";
import { PathNames } from "../utils/constants";
const { ROOT } = PathNames;

export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[],
);

const index = ({ user: userString, token }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogOut = async () => {
		await dispatch(logOut());
		await router.push(ROOT);
	};

	const user: UserInterface = JSON.parse(userString);
	return (
		<>
			<h3>Good to see you, {user.firstName}!</h3>
			<p>This route can only be accessed when logged in.</p>
			<Button onClick={() => handleLogOut()}>Log Out</Button>
		</>
	);
};

export default index;
