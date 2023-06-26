import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from "./user";
import { queries} from "./user/queries";

export async function initServer() {
    const app = express()

    app.use(bodyParser.json());
    app.use(cors());

    const graphqlServer = new ApolloServer({
        typeDefs: `
            ${User.types}
            type Query{
                ${User.queries}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
        },
    });
    
    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer));
    return app;
}