import React from 'react'
import { RouteComponentProps } from 'react-router'
import { FoodCreateController, shopDetailQuery } from '@canteen/common'
import FoodForm from './components/FoodForm'
import {
	ShopDetailQuery,
	ShopDetailQueryVariables,
} from '@canteen/common/dist/types/ShopDetailQuery'

const FoodCreate = ({ history, location }: RouteComponentProps) => {
	const shopId = location.state.shopId
	return (
		<FoodCreateController
			update={(store, { data }) => {
				if (data && data.createFood) {
					const shop = store.readQuery<
						ShopDetailQuery,
						ShopDetailQueryVariables
					>({
						query: shopDetailQuery,
						variables: { id: shopId },
					})
					if (shop) {
						const foods = shop.detailShop.foods || []
						foods.push(data.createFood)
						shop.detailShop.foods = foods.slice()

						store.writeQuery<ShopDetailQuery, ShopDetailQueryVariables>({
							query: shopDetailQuery,
							data: shop,
							variables: { id: shopId },
						})
					}
				}
			}}
		>
			{({ submit, loading }) => (
				<FoodForm
					loading={!!loading}
					shopId={shopId}
					submit={submit}
					onFinish={() => {
						history.push(`/shop/detail/${shopId}`)
					}}
				/>
			)}
		</FoodCreateController>
	)
}

export default FoodCreate
