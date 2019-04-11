import React from 'react'
import { ShopAddedController } from '@canteen/common'
import ShopListing from './ShopListing'

const ShopAdded = (props: any) => {
	return (
		<ShopAddedController>
			{({ data }) => {
				return (
					<ShopListing
						{...props}
						addedShop={(data && data.shopAdded) || null}
					/>
				)
			}}
		</ShopAddedController>
	)
}

export default ShopAdded
