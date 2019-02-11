import Axios, { AxiosRequestConfig } from 'axios'
import Document, { DefaultDocumentIProps, Head, Main, NextDocumentContext, NextScript } from 'next/document'
import React, { ReactNode } from 'react'
import { ServerStyleSheet, StyledProps } from 'styled-components'
import flush from 'styled-jsx/server'

class MyDocument extends Document<StyledProps<any>> {
	static async getInitialProps({renderPage}: NextDocumentContext) {

		// Styled Components:
		const sheet = new ServerStyleSheet()
		let pageContext: any
		const page = renderPage(App => props => {
			pageContext = props.pageContext
			return sheet.collectStyles(<App {...props} />)
		})
		const styleTags = sheet.getStyleElement()

		let css
		// It might be undefined, e.g. after an error.
		if (pageContext) {
			css = pageContext.sheetsRegistry.toString()
		}

		// UNIVERSAL-COOKIE
		return {
			...page,
			// pageContext,
			styleTags,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: <React.Fragment>
				<style
					id="jss-server-side"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: css }}
				/>
				{flush() || null}
			</React.Fragment> as any,
		}
	}

	render() {
		return (
			<html lang="" dir="ltr">
				<Head>
					{this.props.styleTags}
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}

export default MyDocument
