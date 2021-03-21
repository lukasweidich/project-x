import { AuthActions } from "../actions/types";
import { UserInterface } from "../db/types/User";
const { LOG_IN, LOG_OUT } = AuthActions;

export interface InitialAuthReducerStateInterface {
	token: string | null;
	user: UserInterface | null;
}

export const initialAuthReducerState: InitialAuthReducerStateInterface = {
	token: null,
	user: null,
};

const authReducer = (state = initialAuthReducerState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOG_IN:
			return {
				...state,
				...payload,
			};
		case LOG_OUT:
			return {
				...state,
				...initialAuthReducerState,
			};
		default:
			return state;
	}
};

export default authReducer;
