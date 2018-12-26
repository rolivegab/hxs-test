import { plainToClass } from "class-transformer"

import UserType from './type'

/**
 * Performs database seed.
 */
export default () => {
	return plainToClass(UserType, [{
		firstname: 'Gabriel',
		lastname: 'Rocha de Oliveira',
		email: 'gabriel@rocha.com',
	}, {
		firstname: 'Anne',
		lastname: 'Ílary de Moraes Gomes',
		email: 'anne@ilary.com',
	}, {
		firstname: 'Anne',
		lastname: 'Ílary de Moraes Gomes',
		email: 'anne@ilary.com',
	}])
}
