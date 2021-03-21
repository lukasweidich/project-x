import Cookies from "js-cookie";
import { EXPIRY_IN_DAYS, CookieNames } from "./constants";
const { COOKIE_CONSENT } = CookieNames;

export const saveCookie = (
	key: string,
	value: any,
	allowCookies: boolean = false,
): void => {
	if (isCookieAvailable(COOKIE_CONSENT) || allowCookies) {
		Cookies.set(key, JSON.stringify(value), {
			expires: EXPIRY_IN_DAYS,
		});
	}
};

export const getCookie = (key: string, defaultValue: any = null): any | null =>
	Cookies.get(key) ? JSON.parse(Cookies.get(key)) : defaultValue;

export const isCookieAvailable = (key: string): boolean =>
	Boolean(getCookie(key));

export const deleteCookie = (key: string): void => {
	Cookies.remove(key);
};

export const deleteAllCookies = (): void => {
	const allCookies = Cookies.get();
	const allCookieKeys = Array.from(Object.keys(allCookies));
	allCookieKeys.forEach((cookieKey) => {
		deleteCookie(cookieKey);
	});
};

export const acceptCookies = (): void => saveCookie(COOKIE_CONSENT, true, true);

export const rejectCookies = (): void => deleteAllCookies();
