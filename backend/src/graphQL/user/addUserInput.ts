import { IsEmail, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class AddUserInput {
	@Field()
	@MaxLength(30)
	firstname: string

	@Field()
	@MaxLength(60)
	lastname: string

	@Field()
	@MaxLength(255)
	@IsEmail()
	email: string
}
