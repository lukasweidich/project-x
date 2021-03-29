import { Document, Model, Schema, model, models, ObjectId } from "mongoose";
import { SchemaNames } from "../../utils/constants";
import User, { UserInterface } from "./User";

const schemaName = SchemaNames.GROUP;

export interface GroupInterface extends Document {
	name: string;
	creator?: ObjectId;
	members?: Array<ObjectId>;
	addUser(userId: ObjectId): Promise<void>;
	deleteUser(userId: ObjectId): Promise<void>;
	isParticipant(user: UserInterface): boolean;
	isInvited(userId: ObjectId): boolean;
	allParticipating(userIds: Array<ObjectId>): boolean;
	isCreator(userId: ObjectId): boolean;
}

export interface GroupModel extends Model<GroupInterface> {}

const GroupSchema = new Schema<GroupInterface, GroupModel>(
	{
		name: { type: String, required: true },
		creator: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: SchemaNames.USER,
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: SchemaNames.USER,
			},
		],
	},
	{
		timestamps: true,
	},
);

GroupSchema.methods.addUser = async function addUser(
	userId: ObjectId,
): Promise<void> {
	this.members = [...this.members, userId];
	const user: UserInterface = await User.findById(userId);
	user.addGroup(this._id);
	await user.save();
	this.save();
};

GroupSchema.methods.deleteUser = async function deleteUser(
	userId: ObjectId,
): Promise<void> {
	this.members = this.members.filter((member) => !(member === userId));
	const user: UserInterface = await User.findById(userId);
	user.deleteGroup(this._id);
	await user.save();
	this.save();
};

GroupSchema.methods.isInvited = function isInvited(
	user: UserInterface,
): boolean {
	return this.members.includes(user._id);
};

GroupSchema.methods.isParticipant = function isParticipant(
	user: UserInterface,
): boolean {
	return user.groups.includes(this._id) && this.isInvited(user._id);
};

GroupSchema.methods.isCreator = function isCreator(userId: ObjectId): boolean {
	//TODO: parse to objectID?
	return this.creator === userId;
};

GroupSchema.methods.allParticipating = function allParticipating(
	userIds: Array<ObjectId>,
): boolean {
	return userIds.every((userId) => this.isInvited(userId));
};

GroupSchema.pre<GroupInterface>("save", async function (next) {
	//TODO: set is not working - parse to objectID?
	this.members = Array.from(
		new Set<ObjectId>([this.creator, ...this.members]),
	);
	next();
});

export default models[schemaName] || model(schemaName, GroupSchema);
