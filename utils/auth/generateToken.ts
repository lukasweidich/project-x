import jwt from "jsonwebtoken";
import { EXPIRY_IN_DAYS } from "../constants";
require("dotenv").config();

const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: `${EXPIRY_IN_DAYS}d`,
	});
};

export default generateToken;
