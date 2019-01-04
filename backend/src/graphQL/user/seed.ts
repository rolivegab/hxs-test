import conn from '../../core/mongodb'

/**
 * Performs database seed.
 */
export default async () => {
	const seeds = [{
		firstname: 'Gabriel',
		lastname: 'Rocha de Oliveira',
		email: 'gabriel@rocha.com',
	}, {
		firstname: 'Anne',
		lastname: 'Ílary de Moraes Gomes',
		email: 'anne@ilary.com',
	}, {
		firstname: 'Robin',
		lastname: 'Hood da Silva Carvalho',
		email: 'Robin@dos.ricos',
	}]

	const db = await conn()
	const count = await db.collection('users').countDocuments()
	if (count === 0) {
		await db.collection('users').insertMany(seeds)
	}
}
