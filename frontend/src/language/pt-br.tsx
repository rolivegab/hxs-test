import update from 'immutability-helper'
import { Fragment } from 'react'
import __ from './Dictionary'

export default update(__, {
	siteName: {
		$set: 'Amigos do pedaço',
	},
	pages: {
		index: {
			title: {$set: 'Entrar'},
			subtitle: {$set: `no ${__.siteName}`},
			button: {$set: 'Entrar'},
			password: {$set: 'Senha'},
			rightTitle: {
				answer: {$set: 'Não possui uma conta?'},
				option: {$set: (E: (p: any) => JSX.Element) => <Fragment>
					Clique <E>aqui</E> para se registrar
				</Fragment>},
			},
		},
	},
})
