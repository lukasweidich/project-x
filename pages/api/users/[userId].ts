import type { NextApiRequest, NextApiResponse } from "next";
import User, { UserInterface } from "../../../db/types/User";
import {
	continueIfAuthenticatedWithBearerToken,
	executeIfUserRequirementsMet,
} from "../../../utils/auth/apiAuth";
import { connect } from "../../../utils/db";
import { isEqual } from "../../../utils/misc";
connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		headers: { authorization },
		query: { userId },
		method,
	} = req;
	await continueIfAuthenticatedWithBearerToken(
		authorization,
		res,
		async (user, token) => {
			await executeIfUserRequirementsMet(
				user,
				[async (user) => user.isAdmin || isEqual(String(userId), user._id)],
				req,
				res,
				async () => {
					switch (method) {
						case "GET":
							try {
								const user: UserInterface = await User.findById(userId);
								res.statusCode = 200;
								res.json({ user });
							} catch (error) {
								res.statusCode = 404;
								res.json({
									error: `Could not find any users. MongoDB: ${error}`,
								});
							}
							break;

						case "PUT":
							const { user } = req.body;
							let userWithoutId: UserInterface = { ...user };
							delete userWithoutId._id;
							try {
								// @ts-ignore
								await User.findByIdAndUpdate(userId, {
									...userWithoutId,
								});
								res.statusCode = 204;
								res.end();
							} catch (error) {
								res.statusCode = 409;
								res.json({
									error: `Could not update user with id ${userId}. MongoDB: ${error}`,
								});
							}
							break;

						case "DELETE":
							try {
								await User.findByIdAndDelete(userId);
								res.statusCode = 204;
								res.end();
							} catch (error) {
								res.statusCode = 409;
								res.json({
									error: `Could not delete user with id ${userId}. MongoDB: ${error}`,
								});
							}
							break;

						default:
							res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
							res.status(405).send(`Method ${method} Not Allowed`);
							break;
					}
				},
			);
		},
	);
};
