import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	CreateShopMutation,
	CreateShopMutationVariables,
} from '../types/CreateShopMutation'

const ShopCreateMutation = gql`
	mutation CreateShopMutation(
		$name: String!
		$address: String
		$phone: String
		$pics: [Upload!]!
	) {
		createShop(name: $name, address: $address, phone: $phone, pics: $pics) {
			id
		}
	}
`

export const ShopCreateController = mutationHOC<
	CreateShopMutation,
	CreateShopMutationVariables
>(ShopCreateMutation)
