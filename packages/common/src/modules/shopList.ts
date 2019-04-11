import gql from 'graphql-tag'
import { PageShopQuery, PageShopQueryVariables } from '../types/PageShopQuery'
import { queryHOC } from './query'

export const shopListQuery = gql`
	query PageShopQuery($size: Float!, $cursor: String) {
		cursorShop(size: $size, cursor: $cursor) {
			data {
				name
				pics
				id
				address
				phone
			}
			hasMore
		}
	}
`

export const ShopListController = queryHOC<
	PageShopQuery,
	PageShopQueryVariables
>(shopListQuery)
