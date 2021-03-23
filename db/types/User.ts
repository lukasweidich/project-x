import { Document, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { SchemaNames } from "../../utils/constants";

const schemaName = SchemaNames.USER;

export interface UserInterface extends Document {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	isAdmin?: boolean;
}

export interface UserModel extends Model<UserInterface> {}

const UserSchema = new Schema<UserInterface, UserModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	},
);

UserSchema.methods.matchPassword = function matchPassword(
	enteredPassword: string,
) {
	return bcrypt.compareSync(enteredPassword, this.password);
};

/**
 * TODO:
 * password is not being encrypted when updated using put request
 *  */

UserSchema.pre<UserInterface>("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export default models[schemaName] || model(schemaName, UserSchema);
