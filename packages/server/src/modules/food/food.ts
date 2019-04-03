import { ApolloError } from 'apollo-server-core'
import { GraphQLUpload } from 'graphql-upload'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Food } from '../../entity/Food'
import { Shop } from '../../entity/Shop'
import { IUpload } from '../../types/Upload'
import { processUpload } from '../shared/processUpload'

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

	@Query(() => [Food])
	@Authorized()
	async pageFoods(
		@Arg('shopId') shopId: string,
		@Arg('pageNo') pageNo: number,
		@Arg('pageSize') pageSize: number
	) {
		const shop = await Shop.findOne(shopId)
		if (!shop) {
			throw new ApolloError('商店已不存在!')
		}
		const data = await Food.find({
			where: { shop },
			take: pageSize,
			skip: (pageNo - 1) * pageSize,
		})

		return data
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
