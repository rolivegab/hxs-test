import { ObjectId } from 'bson'
import { Field, ObjectType } from 'type-graphql'
import { ObjectIdScalar } from '../objectScalar'

@ObjectType({ description: "Object representing an user." })
export default class User {
	@Field(type => ObjectIdScalar)
	readonly _id: ObjectId

	@Field({description: 'User\'s firstname'})
	firstname: string

	@Field({description: 'User\'s lastname'})
	lastname: string

	@Field({description: 'User\'s email'})
	email: string

	@Field({description: 'User\'s password'})
	password: string

	@Field({nullable: true})
	get fullName(): string {
		return this.firstname + ' ' + this.lastname
	}
}
