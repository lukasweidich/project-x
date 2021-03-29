import { Document, Model, Schema, model, models, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";
import { SchemaNames } from "../../utils/constants";

const schemaName = SchemaNames.USER;

export interface UserInterface extends Document {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	avatar?: string;
	isAdmin?: boolean;
	groups?: Array<ObjectId>;
	matchPassword(enteredPassword: string): boolean;
	addGroup(groupId: ObjectId): void;
	deleteGroup(groupId: ObjectId): void;
}

export interface UserModel extends Model<UserInterface> {}

const UserSchema = new Schema<UserInterface, UserModel>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String, default: "" },
		isAdmin: { type: Boolean, default: false },
		groups: [
			{
				type: Schema.Types.ObjectId,
				ref: SchemaNames.GROUP,
			},
		],
	},
	{
		timestamps: true,
	},
);

UserSchema.methods.matchPassword = function matchPassword(
	enteredPassword: string,
): boolean {
	return bcrypt.compareSync(enteredPassword, this.password);
};

UserSchema.methods.addGroup = function addGroup(groupId: ObjectId): void {
	this.groups = [...this.groups, groupId];
	this.save();
};

UserSchema.methods.deleteGroup = function deleteGroup(groupId: ObjectId): void {
	this.groups = this.groups.filter((group) => !(group === groupId));
	this.save();
};

UserSchema.pre<UserInterface>("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	//TODO: set is not working - parse to objectID?
	this.groups = Array.from(new Set<ObjectId>(this.groups));
	next();
});

export default models[schemaName] || model(schemaName, UserSchema);
