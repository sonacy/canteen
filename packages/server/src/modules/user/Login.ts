import { ApolloError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import { User } from 'src/entity/User'
import { IMyContext } from 'src/types/MyContext'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export default class LoginResolver {
	@Mutation(() => User)
	async login(
		@Arg('name') name: string,
		@Arg('password') password: string,
		@Ctx() ctx: IMyContext
	) {
		const user = await User.findOne({ where: { name } })
		if (!user) {
			throw new ApolloError('user not register yet!', 'name')
		}

		if (!user.confirmed) {
			throw new ApolloError('please confirm your register first!', 'name')
		}

		if (user.isLocked) {
			throw new ApolloError('account locked, please unlock first!', 'name')
		}

		const isValid = await bcrypt.compare(password, user.password)
		if (!isValid) {
			throw new ApolloError('password wrong!', 'password')
		}

		ctx.req.session!.userId = user.id
		return user
	}
}
