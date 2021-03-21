import User, { UserInterface } from "../../../db/types/User";
import generateToken from "../../../utils/auth/generateToken";
import { connect } from "../../../utils/db";
connect();

export default async (req, res) => {
	const {
		body: { username, password },
		method,
	} = req;

	switch (req.method) {
		case "POST":
			try {
				if (username && password) {
					const user: UserInterface = await User.findOne({ username });
					// @ts-ignore
					if (user && (await user.matchPassword(password))) {
						res.statusCode = 200;
						res.json({
							user,
							token: generateToken(user._id),
						});
					} else {
						res.statusCode = 401;
						res.json({
							error: `Invalid email or password.`,
						});
					}
				} else {
					res.statusCode = 401;
					res.json({
						error: `Request was either missing email or password.`,
					});
				}
			} catch (error) {
				res.statusCode = 401;
				res.send(error.message);
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).send(`Method ${method} Not Allowed`);
			break;
	}
};
