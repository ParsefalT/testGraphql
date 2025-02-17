import mongoose from "mongoose";

export const MongoDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`connect to MongoDB - ${connect.connection.host} - success`);
	} catch (err) {
		console.log(err);
	}
};
