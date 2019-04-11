import { subscriptionHOC } from './subscription'
import gql from 'graphql-tag'
import { ShopAddedSubscription } from '../types/ShopAddedSubscription'

export const shopAddedSubscription = gql`
	subscription ShopAddedSubscription {
		shopAdded {
			id
			name
			phone
			address
			pics
		}
	}
`

export const ShopAddedController = subscriptionHOC<ShopAddedSubscription, {}>(
	shopAddedSubscription
)
