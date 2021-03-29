import axios from "axios";
import { UserInterface } from "./../db/types/User";
import { PathNames } from "./constants";
import { GroupInterface } from "./../db/types/Group";
interface AuthenticationResponseInterface {
	token: string;
	user: UserInterface;
}
const { API_LOGIN, API_USERS, API_GROUPS } = PathNames;

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

export const getUser = async (userId, token): Promise<UserInterface> => {
	const {
		data: { user },
	}: { data: { user: UserInterface } } = await axios.get(
		`${API_USERS}/${userId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);
	return user;
};

export const getGroups = async (token): Promise<Array<GroupInterface>> => {
	const {
		data: { groups },
	}: { data: { groups: Array<GroupInterface> } } = await axios.get(
		`${API_GROUPS}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);
	return groups;
};
