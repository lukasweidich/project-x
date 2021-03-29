import User, { UserInterface } from "../../../db/types/User";
import generateToken from "../../../utils/auth/generateToken";
import { connect } from "../../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";
connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		body: { username, password },
		method,
	} = req;

	switch (req.method) {
		case "POST":
			try {
				if (username && password) {
					const user: UserInterface = await User.findOne({ username });
					if (user && (await user.matchPassword(password))) {
						res.status(200).json({
							user,
							token: generateToken(user._id),
						});
					} else {
						res.status(401).json({
							error: `Invalid email or password.`,
						});
					}
				} else {
					res.status(401).json({
						error: `Request was either missing email or password.`,
					});
				}
			} catch (error) {
				res.status(401).send(error.message);
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).send(`Method ${method} Not Allowed`);
			break;
	}
};
