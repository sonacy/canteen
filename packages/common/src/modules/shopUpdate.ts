import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	UpdateShopMutation,
	UpdateShopMutationVariables,
} from '../types/updateShopMutation'

const ShopUpdateMutation = gql`
	mutation UpdateShopMutation(
		$id: String!
		$name: String!
		$address: String!
		$phone: String!
		$pics: [Upload!]
	) {
		updateShop(
			name: $name
			address: $address
			phone: $phone
			pics: $pics
			id: $id
		) {
			id
			name
			address
			phone
			pics
		}
	}
`

export const ShopUpdateController = mutationHOC<
	UpdateShopMutation,
	UpdateShopMutationVariables
>(ShopUpdateMutation)
