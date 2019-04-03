import { Ctx, Mutation, Resolver } from 'type-graphql'
import { IMyContext } from '../../types/MyContext'

@Resolver()
export default class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: IMyContext): Promise<boolean> {
		return new Promise((resolve, reject) => {
			ctx.req.session!.destroy(err => {
				if (err) {
					console.log(err)
					reject(false)
				}
			})
			ctx.res.clearCookie('qid')
			resolve(true)
		})
	}
}
