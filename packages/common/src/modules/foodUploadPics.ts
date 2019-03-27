import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	UploadPicsToFoodMutation,
	UploadPicsToFoodMutationVariables,
} from '../types/UploadPicsToFoodMutation'

export const foodPicsUploadMutation = gql`
	mutation UploadPicsToFoodMutation($id: String!, $pics: [Upload!]!) {
		uploadPicsToFood(pics: $pics, id: $id) {
			id
			pics
		}
	}
`

export const FoodPicsUploadController = mutationHOC<
	UploadPicsToFoodMutation,
	UploadPicsToFoodMutationVariables
>(foodPicsUploadMutation)
