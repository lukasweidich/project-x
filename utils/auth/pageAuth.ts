import jwt from "jsonwebtoken";
import User, { UserInterface } from "../../db/types/User";
import { connect } from "../db";
import { UserRequirementFunction } from "./apiAuth";
import { InitialAuthReducerStateInterface } from "./../../reducers/authReducer";
import { doesUserMeetAllRequirements } from "../misc";
require("dotenv").config();
connect();

export const protectRoute = (
	fn: (user: UserInterface, token: string) => any,
	userRequirements: UserRequirementFunction[],
): any => async (ctx) => {
	const { req, resolvedUrl } = ctx;
	const {
		token,
		user,
	}: InitialAuthReducerStateInterface = await getTokenAndUserInfoFromRequest(
		req,
	);

	const allRequirementsMet = await doesUserMeetAllRequirements(
		user,
		userRequirements,
	);

	if (!token) {
		return {
			redirect: {
				destination: `/login?redirect=${resolvedUrl}`,
				statusCode: 302,
			},
		};
	} else if (allRequirementsMet) {
		return fn(user, token);
	} else {
		return {
			redirect: {
				destination: `/`,
				statusCode: 302,
			},
		};
	}
};

const getTokenAndUserInfoFromRequest = async (
	request,
): Promise<InitialAuthReducerStateInterface> => {
	const defaultReturn: InitialAuthReducerStateInterface = {
		user: null,
		token: null,
	};

	const {
		cookies: { token },
	} = request;
	if (token) {
		const sanitizedToken: string = removeDoubleQuotesFromToken(token);
		try {
			const decoded = jwt.verify(
				String(sanitizedToken),
				process.env.JWT_SECRET,
			);
			const correspondingUserInDb: UserInterface = await User.findById(
				decoded.id,
			);
			return {
				...defaultReturn,
				user: correspondingUserInDb,
				token: sanitizedToken,
			};
		} catch (err) {
			return defaultReturn;
		}
	} else {
		return defaultReturn;
	}
};

const removeDoubleQuotesFromToken = (token: string): string => {
	return String(token).replace(/"/g, "");
};
