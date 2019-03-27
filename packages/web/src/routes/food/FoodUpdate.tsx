import React from 'react'
import { RouteComponentProps } from 'react-router'
import { FoodUpdateController } from '@canteen/common'
import FoodForm from './components/FoodForm'

const FoodUpdate = ({ history, location }: RouteComponentProps) => {
	const shopId = location.state.shopId
	const food = location.state.food
	return (
		<FoodUpdateController>
			{({ submit }) => (
				<FoodForm
					food={food}
					shopId={shopId}
					submit={submit}
					onFinish={() => {
						history.push(`/shop/detail/${shopId}`)
					}}
				/>
			)}
		</FoodUpdateController>
	)
}

export default FoodUpdate
