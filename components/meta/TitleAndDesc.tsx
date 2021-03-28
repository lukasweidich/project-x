import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const TitleAndDesc = ({ title = "", desc = "" }) => {
	const {
		t,
		i18n: { language },
	} = useTranslation();

	const router = useRouter();
	const isHome = router.pathname === "/";

	title = isHome ? title : `${title} - ${t("common:app-name")}`;

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={desc} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={desc} />
			<meta httpEquiv="language" content={language} />
			<meta name="language" content={language} />
		</Head>
	);
};

export default TitleAndDesc;
