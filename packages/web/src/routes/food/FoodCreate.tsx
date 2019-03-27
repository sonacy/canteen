import React from 'react'
import { RouteComponentProps } from 'react-router'
import { FoodCreateController, shopDetailQuery } from '@canteen/common'
import FoodForm from './components/FoodForm'

const FoodCreate = ({ history, location }: RouteComponentProps) => {
	const shopId = location.state.shopId
	return (
		<FoodCreateController
			update={(store, { data }) => {
				if (data && data.createFood) {
					const shop: any = store.readQuery({
						query: shopDetailQuery,
						variables: { id: shopId },
					})

					const foods = shop.detailShop.foods || []
					foods.push(data.createFood)
					shop.detailShop.foods = foods.slice()

					store.writeQuery({ query: shopDetailQuery, data: shop })
				}
			}}
		>
			{({ submit }) => (
				<FoodForm
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
