import { IMyContext } from 'src/types/MyContext'
import { Ctx, Mutation, Resolver } from 'type-graphql'

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
