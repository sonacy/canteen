import bcrypt from 'bcryptjs'
import { User } from 'src/entity/User'
import { redis } from 'src/redis'
import { CONFIRM_USER_PREFIX, FRONTEND_HOST } from 'src/utils/constants'
import { sendEmail } from 'src/utils/sendEmail'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { v4 } from 'uuid'
import RegisterInput from './register/RegisterInput'

@Resolver()
export default class RegisterResolver {
	@Mutation(() => User)
	async register(@Arg('data') { email, name, password }: RegisterInput) {
		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await User.create({
			email,
			password: hashedPassword,
			name,
		}).save()

		const token = v4()
		await redis.set(CONFIRM_USER_PREFIX + token, user.id, 'ex', 60 * 60 * 24)

		await sendEmail(user.email, `${FRONTEND_HOST}/user/confirm/${token}`)
		return user
	}
}
