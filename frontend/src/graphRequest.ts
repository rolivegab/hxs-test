import axios from 'axios'

export default async<T = any> (query: any, variables?: any) => {
	const finalUrl = `${process.env.SERVER_URL}${process.env.GRAPHQL_PATH}`
	const {data} = await axios.post<{data: T}>(finalUrl, {
		query: query.loc.source.body,
		variables,
	})
	return data.data
}
