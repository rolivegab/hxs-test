import { Button, Grid, TextField } from '@material-ui/core'
import gql from 'graphql-tag'
import graphRequest from 'graphRequest'
import update from 'immutability-helper'
import joi from 'joi'
import * as React from 'react'
import {RegisterForm} from 'styles/register'
import {isEmail} from 'validator'

const ADD_USER = gql`
	mutation($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
		addUser(input: {
			firstname: $firstname,
			lastname: $lastname,
			email: $email,
			password: $password
		}) {
			_id
		}
	}
`

interface Input {
	value: string
	error?: string
}

type FormKeys = 'firstname' | 'lastname' | 'email' | 'emailConfirmation' | 'password' | 'passwordConfirmation'
interface State {
	form: {
		[K in FormKeys]: Input
	}
}

export default class extends React.Component<{}, State> {
	constructor(p: any) {
		super(p)
		this.state = {
			form: {
				email: {
					value: '',
				},
				emailConfirmation: {
					value: '',
				},
				firstname: {
					value: '',
				},
				lastname: {
					value: '',
				},
				password: {
					value: '',
				},
				passwordConfirmation: {
					value: '',
				},
			},
		}
	}
	change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.currentTarget

		this.setState(update(this.state, {
			form: {
				[name]: {
					value: {
						$set: value,
					},
				},
			},
		}))
	}

	submit = async (e: React.FormEvent<HTMLFormElement>) => {
		// this.validate()
		const {emailConfirmation, passwordConfirmation, ...data} = this.state.form
		// const i = 'firstname'
		// console.log(this.state.form[i])
		const {_id} = await graphRequest(ADD_USER, Object.entries(data).map(i => ({
			[i[0]]: i[1].value,
		})))
	}

	// validate = () => {
	// 	const schema = joi.object().keys({
	// 		firstname: {
	// 			value: joi
	// 				.string().error(new Error('Não pode ser vazio'))
	// 				.regex(/[a-zA-Z]/).error(() => 'Caracteres inválidos')
	// 				.max(30),
	// 		},
	// 		lastname: {
	// 			value: joi.string().regex(/[a-zA-Z]/).max(60),
	// 		},
	// 		email: {
	// 			value: joi.string().email().max(255),
	// 		},
	// 		emailConfirmation: {
	// 			value: joi.string(),
	// 		},
	// 		password: {
	// 			value: joi.string().min(8),
	// 		},
	// 		passwordConfirmation: {
	// 			value: joi.string(),
	// 		},
	// 	}).assert('email.value', joi.ref('emailConfirmation.value'), 'Email não confere')
	// 	.assert('password.value', joi.ref('passwordConfirmation.value'), 'Senha não confere')
	// 	const {error, value} = joi.validate(this.state.form, schema, {abortEarly: false})
	// 	console.log(error.details)
	// }

	render() {
		const f = this.state.form
		return (
			<Grid container justify="center">
				<RegisterForm item>
					<form action="javascript:void(0)" onSubmit={this.submit}>
						<TextField
							label="Email"
							fullWidth
							margin="normal"
							type="email"
							name="email"
							onChange={this.change}
							value={f.email.value}
							error={f.email.error !== undefined}
							helperText={f.email.error}
						/>
						<TextField
							label="Confirmação de Email"
							fullWidth
							margin="normal"
							type="email"
							name="emailConfirmation"
							onChange={this.change}
							value={f.emailConfirmation.value}
							error={typeof f.emailConfirmation.error === 'string'}
						/>
						<TextField
							label="Primeiro nome"
							fullWidth
							margin="normal"
							name="firstname"
							onChange={this.change}
							value={f.firstname.value}
						/>
						<TextField
							label="Sobrenome completo"
							fullWidth
							margin="normal"
							name="lastname"
							onChange={this.change}
							value={f.lastname.value}
						/>
						<TextField
							label="Senha"
							fullWidth
							margin="normal"
							name="password"
							onChange={this.change}
							value={f.password.value}
							type="password"
						/>
						<TextField
							label="Confirmação de Senha"
							fullWidth
							margin="normal"
							name="passwordConfirmation"
							onChange={this.change}
							value={f.passwordConfirmation.value}
							type="password"
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							type="submit"
						>
							Enviar
						</Button>
					</form>
				</RegisterForm>
			</Grid>
		)
	}
}
