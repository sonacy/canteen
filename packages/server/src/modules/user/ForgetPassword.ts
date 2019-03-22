import { User } from 'src/entity/User'
import { redis } from 'src/redis'
import { FORGOT_PASSWORD_PREFIX, FRONTEND_HOST } from 'src/utils/constants'
import { sendEmail } from 'src/utils/sendEmail'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { v4 } from 'uuid'

@Resolver()
export default class ForgotPassword {
	@Mutation(() => Boolean)
	async forgotPassword(@Arg('email') email: string): Promise<boolean> {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return false
		}

		user.isLocked = true
		await user.save()

		const token = v4()
		await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, 'ex', 60 * 60 * 24)
		await sendEmail(
			user.email,
			`${FRONTEND_HOST}/user/change-password/${token}`,
			'Change Password'
		)
		return true
	}
}
