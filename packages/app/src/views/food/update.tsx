import React from 'react'
import { FoodUpdateController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import FoodForm from './ui/foodForm'

class FoodUpdate extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '编辑菜单',
	}

	render() {
		const { navigate, getParam } = this.props.navigation
		const food = getParam('food', {})
		const id = getParam('id', null)

		return (
			<FoodUpdateController
				onAuthError={() => {
					navigate('Login', {
						next: 'ShopDetail',
						id: id,
					})
				}}>
				{({ submit, loading }) => (
					<FoodForm
						shopId={id}
						food={food}
						loading={!!loading}
						submit={submit}
						onFinish={() => {
							navigate('ShopDetail', {
								id,
							})
						}}
					/>
				)}
			</FoodUpdateController>
		)
	}
}

export default FoodUpdate
