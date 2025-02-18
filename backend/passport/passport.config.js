import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
	passport.serializeUser((user, done) => {
		console.log("Serialize user");
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		console.log("Deserialize user");
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (error) {
			console.log(error);
		}
	});

	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("invalid username or pwd");
				}
				const validPassword = await bcrypt.compare(
					password,
					user.password
				);
				if (!validPassword) {
					throw new Error("invalid password");
				}
				return done(null, user);
			} catch (error) {
				console.log(error);
			}
		})
	);
};
