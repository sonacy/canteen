import { createConnection } from 'typeorm'

export const testConn = async (drop: boolean = false) => {
	return createConnection({
		type: 'mysql',
		name: 'default',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
		database: 'canteen-server-ts-graphql-test',
		synchronize: drop,
		dropSchema: drop,
		entities: [__dirname + '/../entity/*.*'],
	})
}
