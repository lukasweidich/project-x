import axios from "axios";
import { UserInterface } from "./../db/types/User";
import { PathNames } from "./constants";
interface AuthenticationResponseInterface {
	token: string;
	user: UserInterface;
}
const { API_LOGIN, API_USERS } = PathNames;

export const authenticateWithUsernameAndPassword = async (
	username: string,
	password: string,
): Promise<AuthenticationResponseInterface> => {
	const {
		data: { token, user },
	} = await axios.post(API_LOGIN, {
		username,
		password,
	});
	return { token, user };
};

export const createUserInDb = async (
	firstName: string,
	lastName: string,
	username: string,
	password: string,
): Promise<UserInterface> => {
	const {
		data: { user },
	}: { data: { user: UserInterface } } = await axios.post(API_USERS, {
		user: {
			firstName,
			lastName,
			username,
			password,
		},
	});
	return user;
};
