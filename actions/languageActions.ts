import { getCountryFromLanguage, Language } from "../reducers/i18nReducer";
import { CookieNames } from "../utils/constants";
import { saveCookie } from "../utils/cookies";
import { LanguageActions } from "./types";
const { SET_LANGUAGE } = LanguageActions;
const { LANGUAGE } = CookieNames;

export const setLanguage = (language: Language) => async (dispatch) => {
	dispatch({
		type: SET_LANGUAGE,
		payload: { language, country: getCountryFromLanguage(language) },
	});
	saveCookie(LANGUAGE, language);
};
