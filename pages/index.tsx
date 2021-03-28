import React from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "../utils/auth/pageAuth";
import Container from "./../components/layout/Container";
import { Heading, Text } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";
import TitleAndDesc from "./../components/meta/TitleAndDesc";

export const getServerSideProps = protectRoute(
	async (user: UserInterface, token: string) => {
		return {
			props: { user: JSON.stringify(user), token },
		};
	},
	[],
);

const index = () => {
	const { t } = useTranslation();
	return (
		<>
			<TitleAndDesc title={t("common:app-name")} desc={t("index:desc")} />
			<Container>
				<Heading>{t("index:title", { name: t("common:app-name") })}</Heading>
				<Text>{t("index:desc")}</Text>
			</Container>
		</>
	);
};

export default index;
