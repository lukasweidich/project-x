import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import languageReducer from "./i18nReducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	theme: themeReducer,
	i18n: languageReducer,
});
