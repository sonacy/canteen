import React from 'react'
import { ShopCreateController, shopListQuery } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import ShopForm from './ui/shopForm'
import {
	PageShopQuery,
	PageShopQueryVariables,
} from '@canteen/common/dist/types/PageShopQuery'

class ShopCreate extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '创建店铺',
	}

	render() {
		return (
			<ShopCreateController
				onAuthError={() => {
					this.props.navigation.navigate('Login', {
						next: 'ShopList',
					})
				}}
				update={(store, { data }) => {
					if (data && data.createShop) {
						let shops = store.readQuery<PageShopQuery, PageShopQueryVariables>({
							query: shopListQuery,
							variables: { size: 10 },
						})
						if (shops && shops.cursorShop.data.length > 0) {
							shops.cursorShop.data.unshift(data.createShop)
						} else {
							shops = {
								cursorShop: {
									__typename: 'ShopPagination',
									data: [data.createShop],
									hasMore: false,
								},
							}
						}

						store.writeQuery<PageShopQuery, PageShopQueryVariables>({
							query: shopListQuery,
							data: shops,
							variables: { size: 10 },
						})
					}
				}}>
				{({ submit, loading }) => (
					<ShopForm
						loading={!!loading}
						submit={submit}
						onFinish={() => {
							this.props.navigation.navigate('ShopList')
						}}
					/>
				)}
			</ShopCreateController>
		)
	}
}

export default ShopCreate
