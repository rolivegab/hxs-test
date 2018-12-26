// Initializing MongoDB Connection
import MongoDB from 'mongodb'

let connection: MongoDB.MongoClient

export default () => new Promise(resolve => {
	if (connection) {
		resolve(connection)
	} else {
		MongoDB.MongoClient.connect(process.env.MONGO_URI as string).then((conn) => {
			connection = conn
			resolve(connection)
		})
	}
})
