import gql from 'graphql-tag'
import { mutationHOC } from './mutation'
import {
	UpdateFoodMutation,
	UpdateFoodMutationVariables,
} from '../types/UpdateFoodMutation'

const foodUpdateMutation = gql`
	mutation UpdateFoodMutation(
		$id: String!
		$name: String!
		$price: Float!
		$calories: Float!
	) {
		updateFood(name: $name, price: $price, calories: $calories, id: $id) {
			id
		}
	}
`

export const FoodUpdateController = mutationHOC<
	UpdateFoodMutation,
	UpdateFoodMutationVariables
>(foodUpdateMutation)
