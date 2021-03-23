import { CookieNames } from "../utils/constants";
import { saveCookie, deleteCookie } from "../utils/cookies";
import { AuthActions } from "./types";
import { authenticateWithUsernameAndPassword } from "./../utils/api";
const { LOG_IN, LOG_OUT } = AuthActions;
const { USER, TOKEN } = CookieNames;

export const logIn = (username: string, password: string) => async (
	dispatch,
): Promise<void> => {
	const { token, user } = await authenticateWithUsernameAndPassword(
		username,
		password,
	);
	dispatch({
		type: LOG_IN,
		payload: { token, user },
	});
	saveCookie(TOKEN, token);
	saveCookie(USER, user);
};

export const logOut = () => (dispatch): void => {
	deleteCookie(TOKEN);
	deleteCookie(USER);
	dispatch({
		type: LOG_OUT,
	});
};
