import React from 'react'
import { FoodCreateController, shopDetailQuery } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import FoodForm from './ui/foodForm'
import {
	ShopDetailQuery,
	ShopDetailQueryVariables,
} from '@canteen/common/dist/types/ShopDetailQuery'

class FoodCreate extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '创建菜单',
	}

	render() {
		const id = this.props.navigation.getParam('id', null)

		return (
			<FoodCreateController
				update={(store, { data }) => {
					if (data && data.createFood) {
						const shop = store.readQuery<
							ShopDetailQuery,
							ShopDetailQueryVariables
						>({
							query: shopDetailQuery,
							variables: { id },
						})
						if (shop) {
							const foods = shop.detailShop.foods || []
							foods.push(data.createFood)
							shop.detailShop.foods = foods.slice()

							store.writeQuery<ShopDetailQuery, ShopDetailQueryVariables>({
								query: shopDetailQuery,
								data: shop,
								variables: { id },
							})
						}
					}
				}}
				onAuthError={() => {
					this.props.navigation.navigate('Login', {
						next: 'ShopDetail',
						id,
					})
				}}>
				{({ submit, loading }) => (
					<FoodForm
						shopId={id}
						loading={!!loading}
						submit={submit}
						onFinish={() => {
							this.props.navigation.navigate('ShopDetail', {
								id,
							})
						}}
					/>
				)}
			</FoodCreateController>
		)
	}
}

export default FoodCreate
