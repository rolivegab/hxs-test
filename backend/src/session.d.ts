/**
 * Define como é a estrutura da sessão do sistema.
 */
declare namespace Express {
	interface Session {
		user?: {
			_id: string
		}
	}
}