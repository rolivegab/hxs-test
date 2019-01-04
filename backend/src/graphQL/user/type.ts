import { ObjectId } from 'bson'
import { Field, ObjectType } from 'type-graphql'
import { ObjectIdScalar } from '../objectScalar'

@ObjectType({ description: "Object representing an user." })
export default class User {
	@Field(type => ObjectIdScalar)
	readonly _id: ObjectId

	@Field()
	firstname: string

	@Field()
	lastname: string

	@Field()
	email: string

	@Field({nullable: true})
	get fullName(): string {
		return this.firstname + ' ' + this.lastname
	}
}
