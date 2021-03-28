import { Heading } from "@chakra-ui/layout";
import React from "react";
import Container from "../components/layout/Container";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "./../utils/auth/pageAuth";
import { useTranslation } from "react-i18next";
import TitleAndDesc from "../components/meta/TitleAndDesc";
export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[],
);

const me = ({ user: userString }: { user: string }) => {
	const { t } = useTranslation();
	const user: UserInterface = JSON.parse(userString);
	return (
		<>
			<TitleAndDesc title={t("user:menu.account")} desc="" />
			<Container>
				<Heading>{t("user:greeting", { name: user.firstName })}</Heading>
			</Container>
		</>
	);
};

export default me;
