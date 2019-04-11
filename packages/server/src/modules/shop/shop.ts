import { ApolloError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
import {
	Arg,
	Authorized,
	Mutation,
	PubSub,
	PubSubEngine,
	Query,
	Resolver,
	Root,
	Subscription,
} from 'type-graphql'
import { LessThan, MoreThan } from 'typeorm'
import { SHOP_ADD_SUBSCRIPTION } from 'utils/constants'
import { Shop } from '../../entity/Shop'
import { IUpload } from '../../types/Upload'
import { processUpload } from '../shared/processUpload'
import ShopPagination from './shopPagination'

@Resolver()
export default class ShopResolver {
	@Subscription(() => Shop, {
		topics: SHOP_ADD_SUBSCRIPTION,
	})
	shopAdded(@Root() { shop }: { shop: Shop }) {
		return shop
	}

	@Mutation(() => Shop)
	@Authorized()
	async createShop(
		@Arg('name') name: string,
		@Arg('address', { nullable: true }) address: string,
		@Arg('phone', { nullable: true }) phone: string,
		@Arg('pics', () => [GraphQLUpload]) files: Array<Promise<IUpload>>,
		@PubSub() pubSub: PubSubEngine
	) {
		const pics = await Promise.all(files.map(processUpload))

		const shop = await Shop.create({
			name,
			address,
			phone,
			pics,
		}).save()
		await pubSub.publish(SHOP_ADD_SUBSCRIPTION, { shop })
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
		const shopPics = shop.pics || []
		if (files) {
			const pics = await Promise.all(files.map(processUpload))
			shopPics.push(...pics)
		}
		shop.pics = shopPics
		shop.name = name
		shop.phone = phone
		shop.address = address

		await shop.save()

		return shop
	}

	@Mutation(() => Shop)
	@Authorized()
	async updatePicsToShop(
		@Arg('id') id: string,
		@Arg('pics', () => [GraphQLUpload])
		files: Array<Promise<IUpload>>
	) {
		const shop = await Shop.findOne(id)
		if (!shop) {
			throw new ApolloError('商店不存在!')
		}
		const shopPics = shop.pics || []
		if (files) {
			const pics = await Promise.all(files.map(processUpload))
			shopPics.push(...pics)
		}
		shop.pics = shopPics
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

	@Query(() => ShopPagination)
	@Authorized()
	async pageShop(
		@Arg('pageNo') pageNo: number,
		@Arg('pageSize') pageSize: number
	): Promise<{
		data: Shop[]
		total: number
	}> {
		const data = await Shop.find({
			order: {
				updatedTime: 'DESC',
			},
			take: pageSize,
			skip: (pageNo - 1) * pageSize,
		})
		const total = await Shop.count()

		return {
			data,
			total,
		}
	}

	@Query(() => ShopPagination)
	@Authorized()
	async cursorShop(
		@Arg('size') size: number,
		@Arg('cursor', { nullable: true }) cursor?: string
	): Promise<{
		data: Shop[]
		hasMore: boolean
	}> {
		let cursorShop = null
		if (cursor) {
			cursorShop = await Shop.findOne(cursor)
		}
		const data = await Shop.find({
			where: {
				updatedTime: cursorShop
					? LessThan(cursorShop.createdTime)
					: MoreThan(0),
			},
			take: size,
			order: {
				updatedTime: 'DESC',
			},
		})
		let hasMore = false
		if (data.length > 0) {
			const more = await Shop.find({
				where: {
					updatedTime: LessThan(data[data.length - 1].updatedTime),
				},
			})

			hasMore = more.length > 0
		}
		return {
			data,
			hasMore,
		}
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
