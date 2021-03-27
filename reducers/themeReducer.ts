import { ThemeActions } from "../actions/types";
import { ColorMode } from "@chakra-ui/color-mode";
const { SET_THEME } = ThemeActions;

export interface InitialThemeReducerStateInterface {
	colorMode: ColorMode;
}

export const initialAuthReducerState: InitialThemeReducerStateInterface = {
	colorMode: "dark",
};

const authReducer = (state = initialAuthReducerState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_THEME:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default authReducer;
