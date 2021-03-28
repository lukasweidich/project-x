import i18n from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import deUser from "./locales/de/user.json";
import deIndex from "./locales/de/index.json";
import deCommon from "./locales/de/common.json";
import enUser from "./locales/en/user.json";
import enIndex from "./locales/en/index.json";
import enCommon from "./locales/en/common.json";

const resources = {
	en: {
		user: enUser,
		index: enIndex,
		common: enCommon,
	},
	de: {
		user: deUser,
		index: deIndex,
		common: deCommon,
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
