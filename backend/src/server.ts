// Configuration from dotenv
import dotenv from 'dotenv'
dotenv.config()

// required from type-graphql
import 'reflect-metadata'

// Express
import Express from 'express'
import ExpressSession from 'express-session'
const app = Express()

// CORS configuration
import cors from 'cors'
app.use(cors())

// MongoDB Session
import MongoDBSession from 'connect-mongodb-session'
const MongoDBStore = MongoDBSession(ExpressSession)
const store = new MongoDBStore({
	uri: process.env.MONGO_URI as string,
	collection: 'session',
})
app.use(ExpressSession({
	store,
	secret: 'hxd test project',
	resave: false,
	saveUninitialized: true,
}))

// handling graphQL server
import graphqlHTTP from 'express-graphql'
import { resolve } from 'path'
import { buildSchema } from 'type-graphql'
import { formatArgumentValidationError } from 'type-graphql'
import User from './graphQL/user/resolver'
(async () => {
	app.use('/graphql', graphqlHTTP({
		schema: await buildSchema({
			resolvers: [User],
			emitSchemaFile: resolve(__dirname, "schema.gql"),
		}),
		graphiql: true,
		formatError: formatArgumentValidationError,
	}))
})()

// Connect to MongoDB
import Connection from './core/mongodb'
Connection()

// Seed Database
import UserSeed from './graphQL/user/seed'
UserSeed()

app
// Express server initialization
.listen(process.env.PORT as string, () => {
	console.log(`Server listen at ${process.env.PORT}`)
})
