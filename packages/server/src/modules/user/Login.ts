import { ApolloError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { IMyContext } from '../../types/MyContext'

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
			throw new ApolloError('用户名还没有注册!', 'name')
		}

		if (!user.confirmed) {
			throw new ApolloError('请登录邮箱完成验证！', 'name')
		}

		if (user.isLocked) {
			throw new ApolloError('账号被锁定，请完成修改密码!', 'name')
		}

		const isValid = await bcrypt.compare(password, user.password)
		if (!isValid) {
			throw new ApolloError('密码错误!', 'password')
		}

		ctx.req.session!.userId = user.id
		return user
	}
}
