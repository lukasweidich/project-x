import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {
	initialAuthReducerState,
	InitialAuthReducerStateInterface,
} from "./reducers/authReducer";
import { rootReducer } from "./reducers/rootReducer";
import {
	CookieNames,
	DEFAULT_COLOR_MODE,
	DEFAULT_LANGUAGE,
} from "./utils/constants";
const { composeWithDevTools } = require("redux-devtools-extension");
import { getCookie } from "./utils/cookies";
import { InitialThemeReducerStateInterface } from "./reducers/themeReducer";
import {
	getCountryFromLanguage,
	InitialI18nReducerStateInterface,
	Language,
} from "./reducers/i18nReducer";
import { ColorMode } from "@chakra-ui/color-mode";
import { UserInterface } from "./db/types/User";
const { USER, TOKEN, THEME, LANGUAGE } = CookieNames;

const tokenFromCookies: string = getCookie(TOKEN);
const userFromCookies: UserInterface = getCookie(USER);
const themeFromCookies: ColorMode = getCookie(THEME) ?? DEFAULT_COLOR_MODE;
const languageFromCookies: Language = getCookie(LANGUAGE) ?? DEFAULT_LANGUAGE;

export interface InitialStoreInterface {
	auth: InitialAuthReducerStateInterface;
	theme: InitialThemeReducerStateInterface;
	i18n: InitialI18nReducerStateInterface;
}

const initialStore: InitialStoreInterface = {
	auth: {
		...initialAuthReducerState,
		token: tokenFromCookies,
		user: userFromCookies,
	},
	theme: {
		colorMode: themeFromCookies,
	},
	i18n: {
		language: languageFromCookies,
		country: getCountryFromLanguage(languageFromCookies),
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialStore,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
