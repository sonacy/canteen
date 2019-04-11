import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ShopCreateController, shopListQuery } from '@canteen/common'
import ShopForm from './components/ShopForm'
import {
	PageShopQuery,
	PageShopQueryVariables,
} from '@canteen/common/dist/types/PageShopQuery'

const ShopCreate = ({ history }: RouteComponentProps) => {
	return (
		<ShopCreateController
			update={(store, { data }) => {
				if (data && data.createShop) {
					let shops = store.readQuery<PageShopQuery, PageShopQueryVariables>({
						query: shopListQuery,
						variables: { size: 5 },
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
						variables: { size: 5 },
					})
				}
			}}
		>
			{({ submit, loading }) => (
				<ShopForm
					loading={!!loading}
					submit={submit}
					onFinish={() => {
						history.push('/shop/list')
					}}
				/>
			)}
		</ShopCreateController>
	)
}

export default ShopCreate
