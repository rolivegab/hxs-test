import styled from "styled-components"

export default styled.div`
	text-align: center;
	padding-top: 20px;

	.table {
		margin-top: 20px;
	}

	.button-wrapper {
		padding-top: 20px;
		text-align: left;

		& > * {
			margin-right: 20px;
		}
	}
`

export const StyledButtonDiv = styled.div`
	padding-top: 20px;
	text-align: right;

	button {
		margin-left: 20px;
	}
`
