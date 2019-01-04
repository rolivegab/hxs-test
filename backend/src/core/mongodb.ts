// Initializing MongoDB Connection
import MongoDB from 'mongodb'

let connection: MongoDB.Db

export default (): Promise<MongoDB.Db> => new Promise(resolve => {
	if (connection) {
		resolve(connection)
	} else {
		MongoDB.MongoClient.connect(process.env.MONGODB_URI as string, {useNewUrlParser: true}).then((conn) => {
			connection = conn.db()
			resolve(connection)
		})
	}
})
