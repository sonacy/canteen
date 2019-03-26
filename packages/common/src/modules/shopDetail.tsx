import { queryHOC } from './query'
import gql from 'graphql-tag'
import {
	ShopDetailQuery,
	ShopDetailQueryVariables,
} from '../types/ShopDetailQuery'

const shopDetailQuery = gql`
	query ShopDetailQuery($id: String!) {
		detailShop(id: $id) {
			id
			name
			address
			phone
			pics
			foods {
				id
				name
				price
				calories
				pics
			}
		}
	}
`

export const ShopDetailController = queryHOC<
	ShopDetailQuery,
	ShopDetailQueryVariables
>(shopDetailQuery)
