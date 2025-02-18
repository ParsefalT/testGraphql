import Transactions from "../models/transactions.model.js";

const transactionResolver = {
	Query: {
		transactions: async (parent, args, context, info) => {
			try {
				if (!context.getUser()) throw new Error("unauthorized");
				const userId = await context.getUser().id;

				const transactions = await Transactions.find({ userId });
				return transactions;
			} catch (error) {
				console.log(error);
			}
		},
		transaction: async (parent, args, context, info) => {
			try {
				const transaction = await Transactions.findById(
					args.transactionId
				);
				return transaction;
			} catch (error) {
				console.log(error);
			}
		},
	},
	Mutation: {
		createTransaction: async (parent, args, context, info) => {
			try {
				const newTransaction = new Transactions({
					...args.input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (error) {
				console.log(error);
			}
		},
		updateTransaction: async (parent, args, context, info) => {
			try {
				const updateTransaction = await Transactions.findByIdAndUpdate(
					args.input.transactionId,
					args.input,
					{ new: true }
				);
				return updateTransaction;
			} catch (error) {
				console.log(error);
			}
		},
		deleteTransaction: async (parent, args, context, info) => {
			try {
				const deleteTransaction = await Transactions.findByIdAndDelete(
					args.transactionId
				);
				return deleteTransaction;
			} catch (error) {
				console.log(error);
			}
		},
	},
};
export default transactionResolver;
