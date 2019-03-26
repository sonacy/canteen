import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ShopCreateController } from '@canteen/common'
import ShopForm from './components/ShopForm'

const ShopCreate = ({ history }: RouteComponentProps) => {
	return (
		<ShopCreateController>
			{({ submit }) => (
				<ShopForm
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
