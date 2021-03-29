import { UserInterface } from "../db/types/User";
import { CookieNames } from "../utils/constants";
import { saveCookie } from "../utils/cookies";
import { UserActions } from "./types";
const { UPDATE_USER } = UserActions;
const { USER } = CookieNames;

export const updateUser = (user: UserInterface) => async (dispatch) => {
	dispatch({
		type: UPDATE_USER,
		payload: { user },
	});
	saveCookie(USER, user);
};
