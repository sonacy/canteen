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
						variables: { pageNo: 1, pageSize: 10 },
					})
					if (shops && shops.pageShop.length > 0) {
						shops.pageShop.push(data.createShop)
					} else {
						shops = {
							pageShop: [data.createShop],
						}
					}

					store.writeQuery<PageShopQuery, PageShopQueryVariables>({
						query: shopListQuery,
						data: shops,
						variables: { pageNo: 1, pageSize: 10 },
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
