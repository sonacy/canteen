import { User } from 'src/entity/User'
import { redis } from 'src/redis'
import { CONFIRM_USER_PREFIX } from 'src/utils/constants'
import { Arg, Mutation, Resolver } from 'type-graphql'

@Resolver()
export default class ConfirmUser {
	@Mutation(() => Boolean)
	async confirmUser(@Arg('token') token: string): Promise<boolean> {
		const userId = await redis.get(CONFIRM_USER_PREFIX + token)
		if (!userId) {
			return false
		}
		await User.update({ id: userId }, { confirmed: true })
		await redis.del(CONFIRM_USER_PREFIX + token)
		return true
	}
}
