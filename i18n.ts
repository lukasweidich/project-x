import i18n from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import deUserAuth from "./locales/de/userAuth.json";
import enUserAuth from "./locales/en/userAuth.json";

const resources = {
	en: {
		userAuth: enUserAuth,
	},
	de: {
		userAuth: deUserAuth,
	},
};

i18n
	.use(BrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		returnObjects: true,
		resources,
		fallbackLng: "en",
		lng: "en",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
