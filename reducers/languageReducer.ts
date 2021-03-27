import { LanguageActions } from "../actions/types";
const { SET_LANGUAGE } = LanguageActions;

export interface InitialLanguageReducerStateInterface {
	language: "en" | "de";
	country: "gb" | "de";
}

export const initialLanguageReducerState: InitialLanguageReducerStateInterface = {
	language: "en",
	country: "gb",
};

const authReducer = (state = initialLanguageReducerState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_LANGUAGE:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default authReducer;
