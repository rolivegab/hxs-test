import axios, { AxiosRequestConfig } from 'axios'

export default async<T = any> (query: any, variables?: any) => {
	const finalUrl = `${process.env.SERVER_URL}${process.env.GRAPHQL_PATH}`
	try {
		const result = await axios.post<{data: T}>(finalUrl, {
			query: query.loc.source.body,
			variables,
		})
		return result
	} catch (e) {
		console.log(e.response.data.errors)
		return null
	}
}
