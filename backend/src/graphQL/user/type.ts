import { IsEmail } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: "Object representing an user." })
export default class User {
	@Field()
	firstname: string

	@Field()
	lastname: string

	@Field()
	@IsEmail()
	email: string

	@Field({nullable: true})
	get fullName(): string {
		return this.firstname + ' ' + this.lastname
	}
}
