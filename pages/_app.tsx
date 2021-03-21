import type { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default app;
