import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import {HttpLink} from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import update from 'immutability-helper'
import App, { Container } from 'next/app'
import Head from 'next/head'
import * as fetch from 'node-fetch'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../src/getPageContext'

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:3001/graphql',
		fetch: fetch as any,
	}),
})

export interface AppState {
	g: {
		counter: number
	},
	setGlobal: (g: AppState['g']) => void
	setGlobalP: (g: (prevState: AppState['g']) => any) => void
}

class MyApp extends App {
	state: AppState
	pageContext: any

	constructor(props: any) {
		super(props)
		this.pageContext = getPageContext()
		this.state = {
			g: {
				counter: 0,
			},
			setGlobal: g => this.setState(update<AppState>(this.state, {g: {
				$set: g,
			}})),
			setGlobalP: g => this.setState(update<AppState>(this.state, {g: {
				$set: g(this.state.g),
			}})),
		}
	}

	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles)
		}
	}

	render() {
		const { Component, pageProps } = this.props
		return (
			<Container>
			<Head>
				<title>My page</title>
			</Head>
			{/* Wrap every page in Jss and Theme providers */}
			<JssProvider
				registry={this.pageContext.sheetsRegistry}
				generateClassName={this.pageContext.generateClassName}
			>
				{/* MuiThemeProvider makes the theme available down the React
						tree thanks to React context. */}
				<MuiThemeProvider
					theme={this.pageContext.theme}
					sheetsManager={this.pageContext.sheetsManager}
				>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<ApolloProvider client={client}>
						{/* Pass pageContext to the _document though the renderPage enhancer
								to render collected styles on server-side. */}
						<Component pageContext={this.pageContext} {...pageProps} g={this.state.g} setGlobal={this.state.setGlobal} setGlobalP={this.state.setGlobalP} />
					</ApolloProvider>
				</MuiThemeProvider>
			</JssProvider>
		</Container>
		)
	}
}

export default MyApp
