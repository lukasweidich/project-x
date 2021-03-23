import User, { UserInterface } from "../../db/types/User";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { doesUserMeetAllRequirements } from "../misc";
require("dotenv").config();

export type UserRequirementFunction = (
	user?: UserInterface,
) => Promise<boolean> | boolean;

interface UserIdAndBearerTokenInterface {
	id: string | null;
	token: string | null;
}

interface ValidateBearerTokenInterface {
	user?: UserInterface;
	isValid: boolean;
	token?: string;
}

export const executeIfUserRequirementsMet = async (
	user: UserInterface,
	userRequirements: UserRequirementFunction[],
	req: NextApiRequest,
	res: NextApiResponse,
	fn = async () => null,
): Promise<void> => {
	const allRequirementsMet = await doesUserMeetAllRequirements(
		user,
		userRequirements,
	);
	if (allRequirementsMet) {
		await fn();
	} else {
		const { method, url } = req;
		res.statusCode = 401;
		res.send(`Not authorized to ${method} ${url}.`);
	}
};

export const continueIfAuthenticatedWithBearerToken = async (
	authorization: string,
	res: NextApiResponse,
	fn = async (user: UserInterface, token: string) => null,
): Promise<void> => {
	if (authorization && authorization.startsWith("Bearer")) {
		const { user, token, isValid } = await validateBearerToken(authorization);
		if (isValid) {
			await fn(user, token);
		} else {
			res.statusCode = 404;
			res.send(`No corresponding user found for Bearer token.`);
		}
	} else {
		res.statusCode = 401;
		res.send(`Invalid or missing Bearer token.`);
	}
};

const validateBearerToken = async (
	authorization: string,
): Promise<ValidateBearerTokenInterface> => {
	try {
		const { id, token } = getUserIdAndBearerTokenFromAuth(authorization);
		const userFromAuth = await getUserById(id);
		return { user: userFromAuth, token, isValid: !!userFromAuth };
	} catch (error) {
		return { isValid: false };
	}
};

const getUserIdAndBearerTokenFromAuth = (
	authorization: string,
): UserIdAndBearerTokenInterface => {
	try {
		const token = authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id } = decoded;
		return { id, token };
	} catch (error) {
		return { id: null, token: null };
	}
};

const getUserById = async (id: string): Promise<UserInterface | null> => {
	try {
		const userFromDb = await User.findById(id);
		return userFromDb;
	} catch (error) {
		return null;
	}
};
