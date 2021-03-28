import { LanguageActions } from "../actions/types";
import { DEFAULT_LANGUAGE } from "../utils/constants";
const { SET_LANGUAGE } = LanguageActions;

export type Language = "en" | "de";
export type Country = "gb" | "de";

export const getCountryFromLanguage = (language: Language): Country => {
	switch (language) {
		case "de":
			return "de";
		case "en":
			return "gb";
		default:
			return getCountryFromLanguage(DEFAULT_LANGUAGE);
	}
};

export interface InitialI18nReducerStateInterface {
	language: Language;
	country: Country;
}

export const initialI18nReducerState: InitialI18nReducerStateInterface = {
	language: DEFAULT_LANGUAGE,
	country: getCountryFromLanguage(DEFAULT_LANGUAGE),
};

const i18nReducer = (state = initialI18nReducerState, action) => {
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

export default i18nReducer;
