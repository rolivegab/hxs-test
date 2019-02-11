import { IsEmail, IsNotEmpty, MaxLength, MinLength, ValidateIf } from 'class-validator'
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

	@Field()
	@MaxLength(32, {message: `Password too long, max size is ${32}`})
	@MinLength(8, {message: `Password too short, min size is ${8}`})
	password: string
}
