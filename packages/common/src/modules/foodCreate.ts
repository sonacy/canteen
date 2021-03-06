import gql from 'graphql-tag'
import { mutationHOC } from './mutation'
import {
	CreateFoodMutation,
	CreateFoodMutationVariables,
} from '../types/CreateFoodMutation'

export const foodCreateMutation = gql`
	mutation CreateFoodMutation(
		$name: String!
		$price: Float!
		$calories: Float!
		$pics: [Upload!]!
		$shopId: String!
	) {
		createFood(
			name: $name
			price: $price
			calories: $calories
			pics: $pics
			shopId: $shopId
		) {
			id
			name
			price
			calories
			pics
			shop {
				id
			}
		}
	}
`

export const FoodCreateController = mutationHOC<
	CreateFoodMutation,
	CreateFoodMutationVariables
>(foodCreateMutation)
