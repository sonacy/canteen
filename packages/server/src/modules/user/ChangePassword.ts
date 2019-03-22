import { ApolloError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import { User } from 'src/entity/User'
import { redis } from 'src/redis'
import { IMyContext } from 'src/types/MyContext'
import { FORGOT_PASSWORD_PREFIX } from 'src/utils/constants'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export default class ChangePassword {
	@Mutation(() => User)
	async changePassword(
		@Arg('token') token: string,
		@Arg('newPassword') newPassword: string,
		@Ctx() ctx: IMyContext
	) {
		const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token)
		if (!userId) {
			throw new ApolloError('change password expired!')
		}

		const user = await User.findOne(userId)
		if (!user) {
			throw new ApolloError('user not exist!')
		}

		user.password = await bcrypt.hash(newPassword, 12)
		user.isLocked = false
		await user.save()

		await redis.del(FORGOT_PASSWORD_PREFIX + token)

		ctx.req.session!.userId = user.id

		return user
	}
}
