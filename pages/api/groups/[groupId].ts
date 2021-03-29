import type { NextApiRequest, NextApiResponse } from "next";
import User, { UserInterface } from "../../../db/types/User";
import {
	continueIfAuthenticatedWithBearerToken,
	executeIfUserRequirementsMet,
} from "../../../utils/auth/apiAuth";
import { connect } from "../../../utils/db";
import Group from "../../../db/types/Group";
import { GroupInterface } from "./../../../db/types/Group";
connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		headers: { authorization },
		query: { groupId },
		method,
	} = req;
	await continueIfAuthenticatedWithBearerToken(
		authorization,
		res,
		async (user, token) => {
			const group: GroupInterface = await Group.findById(groupId);

			switch (method) {
				case "GET":
					await executeIfUserRequirementsMet(
						user,
						[(user) => user.isAdmin || group.isInvited(user._id)],
						req,
						res,
						async () => {
							try {
								res.status(200).json({ group });
							} catch (error) {
								res.status(404).json({
									error: `Could not find group with id ${groupId}. MongoDB: ${error}`,
								});
							}
						},
					);
					break;

				case "PUT":
					await executeIfUserRequirementsMet(
						user,
						[(user) => user.isAdmin || group.isParticipant(user)],
						req,
						res,
						async () => {
							try {
								const {
									group: { creator, ...groupPropertiesFromRequest },
								}: { group: GroupInterface } = req.body;

								Object.keys(groupPropertiesFromRequest).forEach(
									(property) =>
										(group[property] = groupPropertiesFromRequest[property]),
								);

								await group.save();
								res.status(204).end();
							} catch (error) {
								res.status(409).json({
									error: `Could not update group with id ${groupId}. MongoDB: ${error}`,
								});
							}
						},
					);
					break;

				case "DELETE":
					await executeIfUserRequirementsMet(
						user,
						[(user) => user.isAdmin || group.isCreator(user._id)],
						req,
						res,
						async () => {
							try {
								await User.findByIdAndDelete(groupId);
								res.status(204).end();
							} catch (error) {
								res.status(409).json({
									error: `Could not delete group with id ${groupId}. MongoDB: ${error}`,
								});
							}
						},
					);
					break;

				default:
					res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
					res.status(405).send(`Method ${method} Not Allowed`);
					break;
			}
		},
	);
};
