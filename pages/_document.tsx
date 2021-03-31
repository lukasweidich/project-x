// import React from "react";
// import Document, { Html, Head, Main, NextScript } from "next/document";
// import { useTranslation } from "react-i18next";

// export const getInitialProps = async (ctx) => {
// 	const initialProps = await Document.getInitialProps(ctx);
// 	return { ...initialProps };
// };

// const next_document = () => {
// 	const { t, i18n } = useTranslation();
// 	const language = i18n.language;

// 	const APP_NAME = t("common:app-name");
// 	const APP_DESCRIPTION = t("index:desc");
// 	return (
// 		<Html lang={language} dir={i18n.dir(language)}>
// 			<Head>
// 				<meta name="application-name" content={APP_NAME} />
// 				<meta name="apple-mobile-web-app-capable" content="yes" />
// 				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
// 				<meta name="apple-mobile-web-app-title" content={APP_NAME} />
// 				<meta name="description" content={APP_DESCRIPTION} />
// 				<meta name="format-detection" content="telephone=no" />
// 				<meta name="mobile-web-app-capable" content="yes" />
// 				<meta name="theme-color" content="#FFFFFF" />
// 				<link
// 					rel="apple-touch-icon"
// 					sizes="180x180"
// 					href="/icons/apple-touch-icon.png"
// 				/>
// 				<link rel="manifest" href="/manifest.json" />
// 				<link rel="shortcut icon" href="/icons/favicon.ico" />
// 			</Head>
// 			<body>
// 				<Main />
// 				<NextScript />
// 			</body>
// 		</Html>
// 	);
// };

// export default next_document;

import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "next-pwa example";
const APP_DESCRIPTION = "This is an example of using next-pwa plugin";

export default class extends Document {
	static async getInitialProps(ctx) {
		return await Document.getInitialProps(ctx);
	}

	render() {
		return (
			<Html lang="en" dir="ltr">
				<Head>
					<meta name="application-name" content={APP_NAME} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={APP_NAME} />
					<meta name="description" content={APP_DESCRIPTION} />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="theme-color" content="#FFFFFF" />
					{/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
					{/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/apple-touch-icon.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="shortcut icon" href="/icons/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
// TODO: use Translation hook to get current language
