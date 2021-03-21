import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async () => {
	switch (mongoose.connection.readyState) {
		case 0:
			try {
				await mongoose.connect(process.env.MONGO_URI, {
					useUnifiedTopology: true,
					useNewUrlParser: true,
					useCreateIndex: true,
					useFindAndModify: false,
				});
			} catch (error) {
				console.error(error);
			}
			break;
		case 1:
			// do nothing
			break;
		default:
			break;
	}
};

export const disconnect = async () => {
	try {
		await mongoose.disconnect();
	} catch (error) {
		console.error(error);
	}
};
