import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedTypeDef from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";

import { MongoDB } from "./db/connect.db.js";
import User from "./models/user.model.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs: mergedTypeDef,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/",
	cors(),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req }) => ({ req }),
	})
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await MongoDB();

console.log(`🚀 Server ready at http://localhost:4000/`);
