import { Grid } from "@material-ui/core"
import styled from "styled-components"

const BORDER_COLOR = 'rgba(0, 0, 0, 0.42)'
const THEME_SPACING = 16

export const LoginForm = styled(Grid)`
	max-width: 350px;
	padding: ${THEME_SPACING}px;

	button {
		margin-top: ${THEME_SPACING}px;
	}
` as typeof Grid

export const RightTitle = styled(Grid)`
	border-left: 1px solid ${BORDER_COLOR};
	padding-left: ${THEME_SPACING}px;
` as typeof Grid
