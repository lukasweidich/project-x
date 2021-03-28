import type { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { SPACING_IN_PX } from "../utils/constants";
import "../i18n";
import DefaultSEO from "../components/meta/DefaultSEO";

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<DefaultSEO />
				<Header />
				<main>
					<Box
						marginTop={SPACING_IN_PX}
						marginBottom={SPACING_IN_PX}
						width="100%"
					>
						<Component {...pageProps} />
					</Box>
				</main>
				<Footer />
			</Provider>
		</ChakraProvider>
	);
};

export default app;
