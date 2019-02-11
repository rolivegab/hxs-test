import Axios, { AxiosRequestConfig } from "axios"

export default async (url: string, data?: any, config?: AxiosRequestConfig) => {
	return await Axios.post(process.env.SERVER_URL + url, data, {...config, withCredentials: true})
}
