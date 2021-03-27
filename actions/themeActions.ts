import { CookieNames } from "../utils/constants";
import { saveCookie } from "../utils/cookies";
import { ThemeActions } from "./types";
import { ColorMode } from "@chakra-ui/color-mode";
const { SET_THEME } = ThemeActions;
const { THEME } = CookieNames;

export const setTheme = (colorMode: ColorMode) => async (dispatch) => {
	dispatch({
		type: SET_THEME,
		payload: { colorMode },
	});
	saveCookie(THEME, colorMode);
};
