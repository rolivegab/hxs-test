import { ApolloError } from "apollo-boost"
import { string } from "prop-types"

interface ApolloErrorGraphQL extends ApolloError {
	networkError: Error & {
		result: {
			errors: Array<{
				validationErrors: Array<{
					property: string
					constraints: {
						[s: string]: string
					}
				}>
			}>,
		},
	}
}

interface X {
	a: 'casa'
	b: 'mesa'
}

type I<T> = {
	[K in keyof T]?: string[]
}

export default <T>(error?: ApolloError) => {
	const e = error as ApolloErrorGraphQL
	try {
		const response = {} as any
		e.networkError.result.errors[0].validationErrors.forEach(
			(i, indexI) => (
				response[i.property] = Object.keys(i.constraints).map(
					(j, indexJ) => i.constraints[j]
				)
			)
		)
		return response as I<T>
	} catch (e) {
		return {}
	}
}
