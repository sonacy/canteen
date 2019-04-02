import React from 'react'
import { FoodCreateController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import FoodForm from './ui/foodForm'

class FoodCreate extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '创建菜单',
	}

	render() {
		const id = this.props.navigation.getParam('id', null)

		return (
			<FoodCreateController
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
