import { MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class {
	@Field()
	@MaxLength(1)
	firstname: string

	@Field()
	@MaxLength(30)
	lastname: string

	@Field()
	@MaxLength(255)
	email: string
}
