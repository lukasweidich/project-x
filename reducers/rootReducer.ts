import { combineReducers } from "redux";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";

export const rootReducer = combineReducers({
	auth: authReducer,
	theme: themeReducer,
});
