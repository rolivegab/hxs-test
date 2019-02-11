import { Grid } from "@material-ui/core"
import styled from "styled-components"

const THEME_SPACING = 16

export const RegisterForm = styled(Grid)`
	max-width: 350px;
	padding: ${THEME_SPACING}px;

	button {
		margin-top: ${THEME_SPACING}px;
	}
` as typeof Grid
