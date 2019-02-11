import { Button, Card, CardContent, CardHeader, Grid, Input, TextField, Typography } from '@material-ui/core'
import update from 'immutability-helper'
import __ from 'language/pt-br'
import Link from 'next/link'
import * as React from 'react'
import {LoginForm, RightTitle} from 'styles/login'

interface State {
	form: {
		email: string
		password: string
	}
}

export default class extends React.Component<any, State> {
	state = {
		form: {
			email: '',
			password: '',
		},
	} as State

	input = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.currentTarget
		if (input.name) {
			this.setState(update(this.state, {
				form: {
					[input.name]: {$set: input.value},
				},
			}))
		} else {
			console.error(input, 'Não possui campo "name"')
		}
	}

	submit = () => {
		//
	}

	render() {
		return (
			<Grid container justify="center">
				<LoginForm item>
					<Grid container>
						<Grid item xs={6}>
							<Typography component="h2" variant="h3">
								{__.pages.index.title}
							</Typography>
							<Typography component="label" variant="subtitle1">
								{__.pages.index.subtitle}
							</Typography>
						</Grid>
						<RightTitle item xs={6}>
							<Typography>
								<b>{__.pages.index.rightTitle.answer}</b>
							</Typography>
							<Typography>
								{__.pages.index.rightTitle.option(({children}) =>
									<Link href="/register">
										<a>{children}</a>
									</Link>
								)}
							</Typography>
						</RightTitle>
					</Grid>
					<TextField
						label="Email"
						name="email"
						value={this.state.form.email}
						onChange={this.input}
						margin="normal"
						fullWidth
						autoFocus
					/>
					<TextField
						label={__.pages.index.password}
						name="password"
						value={this.state.form.password}
						onChange={this.input}
						margin="normal"
						type="password"
						fullWidth
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={this.submit}
					>
						Login
					</Button>
				</LoginForm>
			</Grid>
		)
	}
}
