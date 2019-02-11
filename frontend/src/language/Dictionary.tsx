import {ComponentClass, Fragment} from 'react'
const SITE_NAME = 'SITE'

export default {
	siteName: 'SITE',
	pages: {
		index: {
			title: `Sign in`,
			subtitle: `to ${SITE_NAME}`,
			rightTitle: {
				answer: `Do not have an account?`,
				option: (E: (p: any) => JSX.Element) => <Fragment>
					Click <E>here</E> to registrate
				</Fragment>,
			},
			email: 'Email',
			password: 'Password',
			button: 'Login',
		},
	},
}
