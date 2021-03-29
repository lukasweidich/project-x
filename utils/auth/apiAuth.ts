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

interface ValidateAuthorizationInterface {
	user?: UserInterface;
	isValid: boolean;
	token?: string;
}

interface ValidateBearerTokenInterface {
	user?: UserInterface;
	isValid: boolean;
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
		const { user, token, isValid } = await validateAuthorization(authorization);
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

const validateAuthorization = async (
	authorization: string,
): Promise<ValidateAuthorizationInterface> => {
	try {
		const token = getTokenFromAuthorization(authorization);
		const { user, isValid } = await validateBearerToken(token);
		return { user, token, isValid };
	} catch (error) {
		return { isValid: false };
	}
};

export const validateBearerToken = async (
	token: string,
): Promise<ValidateBearerTokenInterface> => {
	try {
		const { id } = getUserIdAndBearerTokenFromAuth(token);
		const userFromAuth = await getUserById(id);
		return { user: userFromAuth, isValid: !!userFromAuth };
	} catch (error) {
		return { isValid: false };
	}
};

const getTokenFromAuthorization = (authorization: string): string =>
	authorization.split(" ")[1];

const getUserIdAndBearerTokenFromAuth = (
	token: string,
): UserIdAndBearerTokenInterface => {
	try {
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
