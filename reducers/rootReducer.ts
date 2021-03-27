import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import languageReducer from "./languageReducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	theme: themeReducer,
	language: languageReducer,
});
