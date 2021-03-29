import { Language } from "../reducers/i18nReducer";
import { ColorMode } from "@chakra-ui/color-mode";

export enum PathNames {
	ROOT = "/",
	LOGIN = "/login",
	SIGNUP = "/signup",
	API_LOGIN = "/api/auth/login",
	API_USERS = "/api/users",
	API_GROUPS = "/api/groups",
}

export enum SchemaNames {
	USER = "User",
	GROUP = "Group",
}

export enum CookieNames {
	COOKIE_CONSENT = "cc",
	USER = "usr",
	TOKEN = "tkn",
	THEME = "thm",
	LANGUAGE = "lng",
}

export const PathNamesWithoutUser: Array<PathNames | String> = [
	PathNames.LOGIN,
	PathNames.SIGNUP,
];

export const USE_COOKIES_WITHOUT_CONSENT: boolean = true;
export const EXPIRY_IN_DAYS: number = 30;
export const SPACING_IN_PX: number = 6;
export const REDIRECT_PARAM: string = "rdr";
export const DEFAULT_LANGUAGE: Language = "en";
export const SUPPORTED_LANGUAGES: Array<Language> = ["en", "de"];
export const DEFAULT_COLOR_MODE: ColorMode = "light";
