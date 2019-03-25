import { ApolloError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
import { Shop } from 'src/entity/Shop'
import { IUpload } from 'src/types/Upload'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { processUpload } from '../shared/processUpload'

@Resolver()
export default class ShopResolver {
	@Mutation(() => Shop)
	@Authorized()
	async createShop(
		@Arg('name') name: string,
		@Arg('address', { nullable: true }) address: string,
		@Arg('phone', { nullable: true }) phone: string,
		@Arg('pics', () => [GraphQLUpload]) files: Array<Promise<IUpload>>
	) {
		const pics = await Promise.all(files.map(processUpload))

		const shop = await Shop.create({
			name,
			address,
			phone,
			pics,
		}).save()
		return shop
	}

	@Mutation(() => Shop)
	@Authorized()
	async updateShop(
		@Arg('id') id: string,
		@Arg('name') name: string,
		@Arg('address', { nullable: true }) address: string,
		@Arg('phone', { nullable: true }) phone: string,
		@Arg('pics', () => [GraphQLUpload], { nullable: true })
		files: Array<Promise<IUpload>>
	) {
		const shop = await Shop.findOne(id)
		if (!shop) {
			throw new ApolloError('商店不存在!')
		}

		const pics = await Promise.all(files.map(processUpload))
		shop.pics.push(...pics)
		shop.name = name
		shop.phone = phone
		shop.address = address

		await shop.save()

		return shop
	}

	@Mutation(() => Boolean)
	@Authorized()
	async deleteShop(@Arg('id') id: string) {
		const shop = await Shop.findOne(id)
		if (!shop) {
			throw new ApolloError('商店不存在!')
		}

		await Shop.remove(shop)

		return true
	}

	@Query(() => [Shop])
	@Authorized()
	async pageShop(
		@Arg('pageNo') pageNo: number,
		@Arg('pageSize') pageSize: number
	) {
		const data = await Shop.find({
			take: pageSize,
			skip: (pageNo - 1) * pageSize,
		})

		return data
	}

	@Query(() => Shop)
	@Authorized()
	async detailShop(@Arg('id') id: string) {
		const shop = await Shop.findOne(id, {
			relations: ['foods'],
		})
		if (!shop) {
			throw new ApolloError('商店不存在!')
		}

		return shop
	}
}
