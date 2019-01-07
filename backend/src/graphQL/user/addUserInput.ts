import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class AddUserInput {
	@Field()
	@MaxLength(30, {message: `First name too long, max size is ${30}`})
	@IsNotEmpty({message: 'First name cannot be empty'})
	firstname: string

	@Field()
	@MaxLength(60, {message: `First name too long, max size is ${60}`})
	@IsNotEmpty({message: 'Last name cannot be empty'})
	lastname: string

	@Field()
	@MaxLength(255, {message: `First name too long, max size is ${255}`})
	@IsEmail({}, {message: `Please provide a valid email`})
	email: string
}
