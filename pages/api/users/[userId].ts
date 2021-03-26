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
				[(user) => user.isAdmin || isEqual(String(userId), user._id)],
				req,
				res,
				async () => {
					switch (method) {
						case "GET":
							try {
								const user: UserInterface = await User.findById(userId);
								res.status(200).json({ user });
							} catch (error) {
								res.status(404).json({
									error: `Could not find any users. MongoDB: ${error}`,
								});
							}
							break;

						case "PUT":
							try {
								/**
								 * do not overwrite isAdmin and _id
								 */
								const {
									user: { isAdmin, _id, ...userPropertiesFromRequest },
								}: { user: UserInterface } = req.body;

								const userFromDb = await User.findById(userId);

								Object.keys(userPropertiesFromRequest).forEach(
									(property) =>
										(userFromDb[property] =
											userPropertiesFromRequest[property]),
								);

								await userFromDb.save();
								res.status(204).end();
							} catch (error) {
								res.status(409).json({
									error: `Could not update user with id ${userId}. MongoDB: ${error}`,
								});
							}
							break;

						case "DELETE":
							try {
								await User.findByIdAndDelete(userId);
								res.status(204).end();
							} catch (error) {
								res.status(409).json({
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
