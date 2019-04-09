import { ApolloError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { LessThan, MoreThan } from 'typeorm'
import { Food } from '../../entity/Food'
import { Shop } from '../../entity/Shop'
import { IUpload } from '../../types/Upload'
import { processUpload } from '../shared/processUpload'
import FoodPagination from './foodPagination'

@Resolver()
export default class FoodResolver {
	@Mutation(() => Food)
	@Authorized()
	async createFood(
		@Arg('name') name: string,
		@Arg('price') price: number,
		@Arg('calories') calories: number,
		@Arg('pics', () => [GraphQLUpload]) files: Array<Promise<IUpload>>,
		@Arg('shopId') shopId: string
	) {
		const pics = await Promise.all(files.map(processUpload))
		const shop = await Shop.findOne(shopId)
		if (!shop) {
			throw new ApolloError('商店已不存在!')
		}
		const food = await Food.create({
			name,
			pics,
			price,
			calories,
			shop,
		}).save()

		return food
	}

	@Mutation(() => Food)
	@Authorized()
	async updateFood(
		@Arg('id') id: string,
		@Arg('name') name: string,
		@Arg('price') price: number,
		@Arg('calories') calories: number,
		@Arg('pics', () => [GraphQLUpload], { nullable: true })
		files: Array<Promise<IUpload>>
	) {
		const food = await Food.findOne(id)
		if (!food) {
			throw new ApolloError('食物不存在!')
		}
		const foodPics = food.pics || []
		if (files) {
			const pics = await Promise.all(files.map(processUpload))
			foodPics.push(...pics)
		}
		food.pics = foodPics
		food.name = name
		food.price = price
		food.calories = calories

		await food.save()

		return food
	}

	@Mutation(() => Food)
	@Authorized()
	async uploadPicsToFood(
		@Arg('id') id: string,
		@Arg('pics', () => [GraphQLUpload])
		files: Array<Promise<IUpload>>
	) {
		const food = await Food.findOne(id)
		if (!food) {
			throw new ApolloError('食物不存在!')
		}
		const foodPics = food.pics || []
		if (files) {
			const pics = await Promise.all(files.map(processUpload))
			foodPics.push(...pics)
		}
		food.pics = foodPics

		await food.save()

		return food
	}

	@Mutation(() => Boolean)
	@Authorized()
	async deleteFood(@Arg('id') id: string) {
		const food = await Food.findOne(id)
		if (!food) {
			throw new ApolloError('食物不存在!')
		}

		await Food.remove(food)

		return true
	}

	@Query(() => FoodPagination)
	@Authorized()
	async pageFoods(
		@Arg('shopId') shopId: string,
		@Arg('pageNo') pageNo: number,
		@Arg('pageSize') pageSize: number
	): Promise<{
		data: Food[]
		total: number
	}> {
		const shop = await Shop.findOne(shopId)
		if (!shop) {
			throw new ApolloError('商店已不存在!')
		}
		const data = await Food.find({
			where: { shop },
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

	@Query(() => FoodPagination)
	@Authorized()
	async cursorFoods(
		@Arg('shopId') shopId: string,
		@Arg('size') size: number,
		@Arg('cursor', { nullable: true }) cursor?: string
	): Promise<{
		data: Food[]
		hasMore: boolean
	}> {
		const shop = await Shop.findOne(shopId)
		if (!shop) {
			throw new ApolloError('商店已不存在!')
		}

		let cursorFood = null
		if (cursor) {
			cursorFood = await Food.findOne(cursor)
		}
		const data = await Food.find({
			where: {
				shop,
				updatedTime: MoreThan(cursorFood ? cursorFood.createdTime : 0),
			},
			take: size,
			order: {
				updatedTime: 'DESC',
			},
		})
		let hasMore = false
		if (data.length > 0) {
			const more = await Food.find({
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

	@Query(() => Food)
	@Authorized()
	async detailFood(@Arg('id') id: string) {
		const food = await Food.findOne(id, {
			relations: ['shop'],
		})
		if (!food) {
			throw new ApolloError('食物不存在!')
		}

		return food
	}
}
