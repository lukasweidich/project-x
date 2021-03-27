import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import {
	initialAuthReducerState,
	InitialAuthReducerStateInterface,
} from "./reducers/authReducer";
import { rootReducer } from "./reducers/rootReducer";
import { CookieNames } from "./utils/constants";
const { composeWithDevTools } = require("redux-devtools-extension");
import { getCookie } from "./utils/cookies";
import { InitialThemeReducerStateInterface } from "./reducers/themeReducer";
const { USER, TOKEN, THEME } = CookieNames;

const tokenFromCookies = getCookie(TOKEN);
const userFromCookies = getCookie(USER);
const themeFromCookies = getCookie(THEME) ?? "light";

export interface InitialStoreInterface {
	auth: InitialAuthReducerStateInterface;
	theme: InitialThemeReducerStateInterface;
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
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialStore,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
