import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import dotenv from 'dotenv'
import Express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import { Food } from './entity/Food'
import { Shop } from './entity/Shop'
import { User } from './entity/User'
import { redis } from './redis'
import { createSchema } from './utils/createSchema'

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
})

const main = async () => {
	const connectionOptions = await getConnectionOptions()
	await createConnection(
		process.env.NODE_ENV === 'production'
			? {
					url: process.env.JAWSDB_URL,
					type: 'mysql',
					name: 'default',
					database: 'canteen-server-ts-graphql',
					entities: [User, Food, Shop],
					synchronize: false,
					logging: false,
			  }
			: connectionOptions
	)

	const schema = await createSchema()
	const server = new ApolloServer({
		playground: true,
		schema,
		context: ({ req, res }: any) => ({ req, res }),
	})

	const app = Express()

	const RedisStore = connectRedis(session)

	app.use(
		cors({
			credentials: true,
			origin:
				process.env.NODE_ENV === 'test'
					? '*'
					: (process.env.FRONTEND_HOST as string),
		})
	)

	app.use(
		session({
			store: new RedisStore({
				client: redis as any,
			}),
			name: 'qid',
			secret: 'asdhopq9wdk',
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7,
			},
		})
	)

	app.use('/images', Express.static('images'))

	server.applyMiddleware({ app, cors: false })

	const port = process.env.PORT || '4000'
	const host = '0.0.0.0'

	app.listen(parseInt(port, 10), host, () => {
		console.log(
			`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`
		)
	})
}

main()
