/* eslint-disable jsx-a11y/anchor-is-valid */

import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
	text-align: center;
	padding-top: 20px;
`

function About(props: any) {
	const { classes } = props

	return (
		<StyledDiv>
			<Typography variant="h4" gutterBottom>
				Material-UI
			</Typography>
			<Typography variant="subtitle1" gutterBottom>
				about page
			</Typography>
			<Typography gutterBottom>
				<Link href="/">
					<a>Go to the main page</a>
				</Link>
			</Typography>
			<Button variant="contained" color="primary">
				Do nothing button
			</Button>
		</StyledDiv>
	)
}

export default About
