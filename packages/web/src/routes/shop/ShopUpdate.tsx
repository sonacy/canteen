import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ShopUpdateController } from '@canteen/common'
import ShopForm from './components/ShopForm'

const ShopUpdate = ({ history, location }: RouteComponentProps) => {
	return (
		<ShopUpdateController>
			{({ submit, loading }) => (
				<ShopForm
					loading={!!loading}
					shop={location.state}
					submit={submit}
					onFinish={() => {
						history.push(`/shop/detail/${location.state.id}`)
					}}
				/>
			)}
		</ShopUpdateController>
	)
}

export default ShopUpdate
