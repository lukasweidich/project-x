import type { NextApiRequest, NextApiResponse } from "next";
import Group, { GroupInterface } from "../../../db/types/Group";
import {
	continueIfAuthenticatedWithBearerToken,
	executeIfUserRequirementsMet,
} from "../../../utils/auth/apiAuth";
import { connect } from "../../../utils/db";
import { UserInterface } from "./../../../db/types/User";
import { ObjectId } from "mongoose";
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
					await executeIfUserRequirementsMet(user, [], req, res, async () => {
						try {
							const groups: GroupInterface[] = await Group.find({});
							const allowedGroups = groups.filter(
								(group) =>
									user.isAdmin ||
									group.isParticipant(user) ||
									group.isInvited(user._id),
							);
							res.status(200).json({ groups: allowedGroups });
						} catch (error) {
							res.status(404).json({
								error: `Could not find any groups. MongoDB: ${error}`,
							});
						}
					});
				},
			);
			break;

		case "POST":
			await continueIfAuthenticatedWithBearerToken(
				authorization,
				res,
				async (user, token) => {
					const {
						body: {
							group: { creator, ...group },
						},
					}: {
						body: {
							group: GroupInterface;
						};
					} = req;

					try {
						const createdGroup: GroupInterface = await Group.create({
							...group,
							creator: user._id,
						});
						createdGroup.addUser(user._id);

						res.status(201).json({ group: createdGroup });
					} catch (error) {
						res.status(409).json({
							error: `Could not create group. MongoDB: ${error}`,
						});
					}
				},
			);
			break;

		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).send(`Method ${method} not allowed`);
			break;
	}
};
