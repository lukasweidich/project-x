import React from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "./../utils/auth/pageAuth";
import Container from "./../components/layout/Container";
import { Heading } from "@chakra-ui/layout";
export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[(user) => user.isAdmin],
);

const admin = () => {
	return (
		<Container>
			<Heading>admin</Heading>
		</Container>
	);
};

export default admin;
