import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Query: {
		// users: (parent, args, context, info) => {
		// 	return users;
		// },
		authUser: async (parent, args, context, info) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (error) {
				console.log(error);
			}
		},
		user: async (_, args) => {
			try {
				const user = await User.findById(args.userId);
				return user;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		signUp: async (_, args, context, info) => {
			try {
				const { username, name, password, gender } = args.input;

				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required");
				}

				const existingUser = await User.findOne({ username });

				if (existingUser) {
					throw new Error("user is exist");
				}

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

				const newUser = new User({
					username,
					name,
					password: hashedPassword,
					gender,
					profilePicture:
						gender === "male" ? boyProfile : girlProfile,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (error) {
				console.log(error);
			}
		},

		login: async (_, args, context, info) => {
			try {
				const { username, password } = args.input;
				const { user } = await context.authenticate("graphql-local", {
					username,
					password,
				});

				await context.login(user);
				return user;
			} catch (error) {
				console.log(error);
			}
		},

		logout: async (_, args, context, info) => {
			try {
				await context.logout();
				req.session.destroy((err) => {
					if (err) throw new Error("something");
				});
				res.clearCookie("connect.sid");
				return { message: "logged out successfully" };
			} catch (error) {
				console.log(error);
			}
		},
	},
};

export default userResolver;
