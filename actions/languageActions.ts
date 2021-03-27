import { CookieNames } from "../utils/constants";
import { saveCookie } from "../utils/cookies";
import { LanguageActions } from "./types";
const { SET_LANGUAGE } = LanguageActions;
const { LANGUAGE } = CookieNames;

export const setLanguage = (language: string) => async (dispatch) => {
	dispatch({
		type: SET_LANGUAGE,
		payload: { language },
	});
	saveCookie(LANGUAGE, language);
};
