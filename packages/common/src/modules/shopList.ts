import gql from 'graphql-tag'
import { PageShopQuery, PageShopQueryVariables } from '../types/PageShopQuery'
import { queryHOC } from './query'

export const shopListQuery = gql`
	query PageShopQuery($pageSize: Float!, $pageNo: Float!) {
		pageShop(pageSize: $pageSize, pageNo: $pageNo) {
			name
			pics
			id
			address
			phone
		}
	}
`

export const ShopListController = queryHOC<
	PageShopQuery,
	PageShopQueryVariables
>(shopListQuery)
