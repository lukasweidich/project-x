import React, { useEffect, useState } from "react";
import { UserInterface } from "../db/types/User";
import { protectRoute } from "../utils/auth/pageAuth";
import Container from "./../components/layout/Container";
import { useTranslation } from "react-i18next";
import TitleAndDesc from "./../components/meta/TitleAndDesc";
import { GroupInterface } from "./../db/types/Group";
import { getGroups } from "../utils/api";
import useAuth from "../hooks/useAuth";
import GroupPreview from "./../components/group/GroupPreview";

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
	const [groups, setGroups] = useState<Array<GroupInterface>>([]);
	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			const init = async () => {
				const groups = await getGroups(token);
				setGroups(groups);
			};
			init();
		}
	}, [token]);
	return (
		<>
			<TitleAndDesc title={t("common:app-name")} desc={t("index:desc")} />
			<Container>
				{groups.map((group, i) => (
					<GroupPreview group={group} key={i} />
				))}
			</Container>
		</>
	);
};

export default index;
