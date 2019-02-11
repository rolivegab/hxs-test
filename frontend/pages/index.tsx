import gql from 'graphql-tag'
import graphRequest from 'graphRequest'
import { NextContext } from 'next'
import Router from 'next/router'
import * as React from 'react'
import request from 'request'
import parseCookie from 'setCookie'

const IS_LOGGED = gql`
	{
		isLogged
	}
`

interface Props {
	headers: any
}

/**
 * Verifica se o usuário está logado, se não estiver, redireciona para a página de login.
 */
export default class extends React.Component<Props> {
	static async getInitialProps({req, res}: NextContext) {
		interface R {
			isLogged: boolean
		}
		const {isLogged} = await graphRequest<R>(IS_LOGGED)
		if (req && res) {
			res.writeHead(302, {
				Location: isLogged ? '/home' : '/login',
			})
			res.end()
		} else {
			Router.push(isLogged ? '/home' : '/login')
		}

		return {}
	}

	render() {
		return (
			<div>{JSON.stringify(this.props.headers)}</div>
		)
	}
}
