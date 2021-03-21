import axios from "axios";
import { UserInterface } from "../db/types/User";

interface AuthenticationResponseInterface {
	token: string;
	user: UserInterface;
}

export const authenticateWithUsernameAndPassword = async (
	username: string,
	password: string,
): Promise<AuthenticationResponseInterface> => {
	const {
		data: { token, user },
	} = await axios.post("/api/auth/login", {
		username,
		password,
	});
	return { token, user };
};
