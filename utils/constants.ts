export enum PathNames {
	ROOT = "/",
	LOGIN = "/login",
	SIGNUP = "/signup",
	API_LOGIN = "/api/auth/login",
	API_USERS = "/api/users",
}

export enum SchemaNames {
	USER = "User",
}

export enum CookieNames {
	COOKIE_CONSENT = "cc",
	USER = "usr",
	TOKEN = "tkn",
}

export const EXPIRY_IN_DAYS: number = 30;
export const REDIRECT_PARAM: string = "rdr";
