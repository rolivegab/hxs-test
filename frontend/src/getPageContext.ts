import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

declare const process: NodeJS.Process & {browser: boolean}

function createPageContext() {
	const aux = {
		theme: createMuiTheme({
			typography: {
				useNextVariants: true,
			},
		}),
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName(),
	}

	return aux
}

let pageContext: any
// Certifica-se de que um novo tema é criado a cada nova requisição ao servidor.
// Reutiliza o mesmo tema caso esteja do lado do cliente.
export default function getPageContext() {
	if (!process.browser) {
		return createPageContext()
	}

	if (!pageContext) {
		pageContext = createPageContext()
	}

	return pageContext
}
