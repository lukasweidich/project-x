import { connect } from "../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import Group, { GroupInterface } from "../../db/types/Group";
import {
	continueIfAuthenticatedWithBearerToken,
	executeIfUserRequirementsMet,
} from "../../utils/auth/apiAuth";
connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		headers: { authorization },
		body: { groupId, userId },
		method,
	} = req;
	await continueIfAuthenticatedWithBearerToken(
		authorization,
		res,
		async (user, token) => {
			switch (method) {
				case "POST":
					const group: GroupInterface = await Group.findById(groupId);
					await executeIfUserRequirementsMet(
						user,
						[(user) => user.isAdmin || group.isCreator(user._id)],
						req,
						res,
						async () => {
							try {
								await group.addUser(userId);
								await group.save();
								res.status(204).end();
							} catch (error) {
								res.status(409).json({
									error: `Could not add user ${userId} to group with id ${groupId}. MongoDB: ${error}`,
								});
							}
						},
					);
					break;
				default:
					res.setHeader("Allow", ["POST"]);
					res.status(405).send(`Method ${method} Not Allowed`);
					break;
			}
		},
	);
};
