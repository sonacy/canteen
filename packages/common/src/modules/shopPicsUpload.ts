import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	UploadPicsToShopMutation,
	UploadPicsToShopMutationVariables,
} from '../types/UploadPicsToShopMutation'

const ShopPicsUploadMutation = gql`
	mutation UploadPicsToShopMutation($id: String!, $pics: [Upload!]!) {
		updatePicsToShop(pics: $pics, id: $id) {
			id
			pics
		}
	}
`

export const ShopPicsUploadController = mutationHOC<
	UploadPicsToShopMutation,
	UploadPicsToShopMutationVariables
>(ShopPicsUploadMutation)
