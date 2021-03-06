import type { NextApiRequest, NextApiResponse } from "next";
import User, { UserInterface } from "../../../db/types/User";
import {
	continueIfAuthenticatedWithBearerToken,
	executeIfUserRequirementsMet,
} from "../../../utils/auth/apiAuth";
import { connect } from "../../../utils/db";
connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		headers: { authorization },
		method,
	} = req;

	switch (method) {
		case "GET":
			await continueIfAuthenticatedWithBearerToken(
				authorization,
				res,
				async (user, token) => {
					await executeIfUserRequirementsMet(
						user,
						[(user) => user.isAdmin],
						req,
						res,
						async () => {
							try {
								const users: UserInterface[] = await User.find({});
								res.status(200).json({ users });
							} catch (error) {
								res.status(404).json({
									error: `Could not find any users. MongoDB: ${error}`,
								});
							}
						},
					);
				},
			);
			break;

		case "POST":
			/**
			 * do not allow anyone to set isAdmin via request
			 */
			const {
				body: {
					user: { isAdmin, ...user },
				},
			}: {
				body: {
					user: UserInterface;
				};
			} = req;

			try {
				const createdUser: UserInterface = await User.create({ ...user });
				res.status(201).json({ user: createdUser });
			} catch (error) {
				res.status(409).json({
					error: `Could not create user. MongoDB: ${error}`,
				});
			}
			break;

		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).send(`Method ${method} not allowed`);
			break;
	}
};
