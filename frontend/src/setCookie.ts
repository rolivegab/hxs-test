import Axios, { AxiosResponse } from 'axios'
import { NextContext } from "next"

export default (res: NextContext['res'], headers: AxiosResponse['headers']) => {
	if (res) {
		res.setHeader('set-cookie', headers['set-cookie'])
	}
}
