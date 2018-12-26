import { plainToClass } from 'class-transformer'
import { Arg, Mutation, Query } from 'type-graphql'
import UserInput from './input'
import Samples from './samples'
import User from './type'

export default class {
	private readonly items: User[] = Samples()

	@Query(returns => [User], { description: "Get all the users from around the world!" })
	async users(): Promise<User[]> {
		return await this.items
	}

	@Mutation(returns => User)
	async addUser(@Arg("input") userInput: UserInput): Promise<User> {
		const user = plainToClass(User, userInput)
		await this.items.push(user)
		return user
	}
}
