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
const { USER, TOKEN } = CookieNames;

const tokenFromCookies = getCookie(TOKEN);
const userFromCookies = getCookie(USER);

export interface InitialStoreInterface {
	auth: InitialAuthReducerStateInterface;
}

const initialStore: InitialStoreInterface = {
	auth: {
		...initialAuthReducerState,
		token: tokenFromCookies,
		user: userFromCookies,
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialStore,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
