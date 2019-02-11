// import { Button, CircularProgress, Collapse, Divider, ExpansionPanel, ExpansionPanelSummary, FormControl, FormHelperText, Grid, GridList, GridListTile, Input, InputLabel, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
// import AddIcon from '@material-ui/icons/Add'
// import RemoveIcon from '@material-ui/icons/Remove'
// import captureApolloErrors from 'apolloErrorHandler'
// import gql from 'graphql-tag'
// import request from 'graphRequest'
// import update from 'immutability-helper'
// import { NextContext } from 'next'
// import Link from 'next/link'
// import Router from 'next/router'
// import * as React from 'react'
// import { Mutation, MutationFn } from 'react-apollo'

// const GET_USERS = gql`
// 	{
// 		users {
// 			_id
// 			fullName
// 			email
// 		}
// 	}
// `

// const ADD_USER = gql`
// 	mutation ($firstname: String!, $lastname: String!, $email: String!) {
// 		addUser(input: {
// 			firstname: $firstname,
// 			lastname: $lastname,
// 			email: $email
// 		}) {
// 			_id,
// 			fullName
// 		}
// 	}
// `

// interface User {
// 	_id: string
// 	fullName: string
// 	email: string
// }

// interface State {
// 	showingAddUser: boolean
// 	form: {
// 		firstname: string
// 		lastname: string
// 		email: string
// 	}
// 	error: {
// 		firstname: string
// 		lastname: string
// 		email: string
// 	}
// }

// interface NewUser {
// 	addUser: {
// 		_id: string
// 		fullName: string
// 	}
// }

// interface Props {
// 	cookie: string
// 	data: {
// 		users: User[]
// 	}
// }

// export default class extends React.Component<Props, State> {
// 	static async getInitialProps(ctx: NextContext) {
// 		interface I {
// 			users: User[]
// 		}
// 		const query = await request<I>(GET_USERS)
// 		if (query) {
// 			const { data } = query
// 			return data
// 		}
// 	}

// 	constructor(props: any) {
// 		super(props)
// 		this.state = {
// 			showingAddUser: false,
// 			form: this.getInitialForm(),
// 			error: this.getInitialForm(),
// 		}
// 	}

// 	getInitialForm(): State['form'] {
// 		return {
// 			firstname: '',
// 			lastname: '',
// 			email: '',
// 		}
// 	}

// 	addUserClick = () => {
// 		this.setState(update(this.state, {
// 			showingAddUser: {
// 				$apply: x => !x,
// 			},
// 		}))
// 	}

// 	inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.currentTarget
// 		this.setState(update(this.state, {
// 			form: {
// 				[name]: {
// 					$set: value,
// 				},
// 			},
// 		}))
// 	}

// 	submit = async (addUser: MutationFn<NewUser, State['form']>) => {
// 		const { firstname, lastname, email } = this.state.form
// 		await addUser({
// 			variables: { firstname, lastname, email },
// 		})
// 		// Reseta o formulário
// 		this.setState({
// 			form: this.getInitialForm(),
// 		})
// 		Router.push('/')
// 	}

// 	render() {
// 		return (
// 			<StyledDiv>
// 				<Typography variant="h3">
// 					Usuários
// 				</Typography>
// 				<Grid container spacing={24} justify="center">
// 					<Grid item lg={6} md={8} xs={12}>
// 						<List className="list" component="nav">
// 							{this.props.data.users.map((i, indexI) => (
// 								<Link key={indexI} href={`/user/${i._id}`}>
// 									<ListItem button component="a">
// 										<ListItemText key={indexI} primary={i.fullName} secondary={i.email} />
// 									</ListItem>
// 								</Link>
// 							))}
// 							<Divider />
// 							<ListItem button onClick={this.addUserClick}>
// 								<ListItemIcon>
// 									{this.state.showingAddUser ? <RemoveIcon /> : <AddIcon />}
// 								</ListItemIcon>
// 								<ListItemText primary="Adicionar Usuário" />
// 							</ListItem>
// 							<Collapse in={this.state.showingAddUser}>
// 								<Mutation<NewUser, State['form']> mutation={ADD_USER}>
// 									{(addUser, {error, loading}) => {
// 										const errors = captureApolloErrors<State['error']>(error)
// 										return <form action="javascript:void(0)" className="form" onSubmit={() => this.submit(addUser)}>
// 											<Grid container spacing={16}>
// 												<Grid item xs={6}>
// 													<FormControl fullWidth error={errors.firstname !== undefined}>
// 														<InputLabel>First name</InputLabel>
// 														<Input name="firstname" onChange={this.inputChange} value={this.state.form.firstname} className="textField" />
// 														<FormHelperText>{errors.firstname}</FormHelperText>
// 													</FormControl>
// 												</Grid>
// 												<Grid item xs={6}>
// 													<FormControl fullWidth error={errors.lastname !== undefined}>
// 														<InputLabel>Last name</InputLabel>
// 														<Input name="lastname" onChange={this.inputChange} value={this.state.form.lastname} className="textField" />
// 														<FormHelperText>{errors.lastname}</FormHelperText>
// 													</FormControl>
// 												</Grid>
// 												<Grid item xs={12}>
// 													<FormControl fullWidth error={errors.email !== undefined}>
// 														<InputLabel>Email</InputLabel>
// 														<Input name="email" onChange={this.inputChange} value={this.state.form.email} className="textField" />
// 														<FormHelperText>{errors.email}</FormHelperText>
// 													</FormControl>
// 												</Grid>
// 												<Grid item xs={12}>
// 													<Button variant="outlined" type="submit">Adicionar {loading && <CircularProgress className="progress" />}</Button>
// 												</Grid>
// 											</Grid>
// 											<br />
// 										</form>
// 									}}
// 								</Mutation>
// 							</Collapse>
// 						</List>
// 					</Grid>
// 				</Grid>
// 			</StyledDiv>
// 		)
// 	}
// }
