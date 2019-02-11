import { ObjectId } from 'bson'
import { plainToClass } from 'class-transformer'
import { Arg, Ctx, Mutation, Query } from 'type-graphql'
import mongodb from '../../core/mongodb'
import {ObjectIdScalar} from '../objectScalar'
import AddUserInput from './addUserInput'
import User from './type'

export default class {
	@Query(returns => Boolean, {description: 'Apenas um teste'})
	isLogged(@Ctx() session?: Express.Session) {
		if (session) {
			console.log(session.user)
			return session.user !== undefined
		}

		return false
	}

	@Query(returns => [User], { description: "Get all the users from around the world!" })
	async users() {
		const db = await mongodb()
		const result = await db.collection('users').find().toArray()
		return result
	}

	@Query(returns => User, { description: "Get user by id" })
	async getUserById(@Arg("_id", returns => ObjectIdScalar) _id: ObjectId) {
		const db = await mongodb()
		const user = await db.collection('users').findOne({_id})

		return user
	}

	@Mutation(returns => User, { description: "Adds an user"})
	async addUser(@Arg("input") userInput: AddUserInput) {
		const user = plainToClass(User, userInput)

		const db = await mongodb()
		await db.collection('users').insertOne(user)

		return user
	}

	@Mutation(returns => User, {nullable: true, description: "Deletes an user"})
	async deleteUser(@Arg("_id", type => ObjectIdScalar) _id: ObjectId) {
		const db = await mongodb()
		const {value} = await db.collection<User>('users').findOneAndDelete({_id})

		return value
	}
}
