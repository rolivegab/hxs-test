import { Button, Dialog, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import gql from 'graphql-tag'
import graphRequest from "graphRequest"
import { NextContext } from "next"
import Link from "next/link"
import Router from "next/router"
import * as React from 'react'
import { Mutation } from "react-apollo"
import StyledDiv, { StyledButtonDiv } from 'styles/user'

const GET_USER = gql`
	query ($_id: ObjectId!){
  	getUserById(_id: $_id) {
			firstname,
			fullName,
			email
		}
	}
`

const DELETE_USER = gql`
	mutation ($_id: ObjectId!){
		deleteUser(_id: $_id) {
			_id
			fullName
		}
	}
`

interface Props {
	firstname: string
	fullName: string
	email: string
	_id: string
}

interface State {
	dialogOpen: boolean
}

export default class extends React.Component<Props, State> {
	static async getInitialProps({query, res, req}: NextContext<{_id: string}>) {
		const {_id} = query
		const result = await graphRequest(GET_USER, {_id})
		if (result) {
			const {data} = result
			return {...data.data.getUserById, _id}
		} else {
			return {}
		}
	}

	constructor(props: any) {
		super(props)
		this.state = {
			dialogOpen: false,
		}
	}

	openDialog = () => {
		this.setState({
			dialogOpen: true,
		})
	}

	closeDialog = () => {
		this.setState({
			dialogOpen: false,
		})
	}

	deleteUser = (f: any) => {
		f()
		Router.push('/')
	}

	render() {
		return (
			<StyledDiv>
				<Grid container justify="center">
					<Grid item lg={4} md={6} xs={10}>
						<Typography variant="h4">
							Olá, {this.props.firstname}!
						</Typography>
						<Table className="table" padding="checkbox">
							<TableBody>
								<TableRow>
									<TableCell><b>Name</b></TableCell>
									<TableCell>{this.props.fullName}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell><b>Email</b></TableCell>
									<TableCell>{this.props.email}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<div className="button-wrapper">
							<Link href="/"><Button variant="outlined">Voltar</Button></Link>
							<Button variant="outlined" color="secondary" onClick={this.openDialog}>Deletar</Button>
						</div>
					</Grid>
				</Grid>
				<Dialog open={this.state.dialogOpen}>
					<DialogTitle>
						Deseja realmente apagar o usuário <b>{this.props.fullName}</b>?
					</DialogTitle>
					<DialogContent>
						<StyledButtonDiv>
							<Mutation mutation={DELETE_USER} variables={{_id: this.props._id}}>
								{(execute) => (
									<Button onClick={() => this.deleteUser(execute)} variant="contained" color="secondary">Deletar</Button>
								)}
							</Mutation>
							<Button onClick={this.closeDialog}>Cancelar</Button>
						</StyledButtonDiv>
					</DialogContent>
				</Dialog>
			</StyledDiv>
		)
	}
}
