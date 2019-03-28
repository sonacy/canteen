import gql from 'graphql-tag'
import { mutationHOC } from './mutation'
import {
	UpdateFoodMutation,
	UpdateFoodMutationVariables,
} from '../types/UpdateFoodMutation'

export const foodUpdateMutation = gql`
	mutation UpdateFoodMutation(
		$id: String!
		$name: String!
		$price: Float!
		$calories: Float!
		$pics: [Upload!]
	) {
		updateFood(
			name: $name
			price: $price
			calories: $calories
			id: $id
			pics: $pics
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

export const FoodUpdateController = mutationHOC<
	UpdateFoodMutation,
	UpdateFoodMutationVariables
>(foodUpdateMutation)
