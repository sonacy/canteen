import React from 'react'
import { LoginController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import LoginForm from './ui/loginForm'

class LoginView extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '登录',
	}

	render() {
		return (
			<LoginController>
				{({ submit, loading }) => (
					<LoginForm
						loading={!!loading}
						submit={submit}
						goToRegister={() => {
							this.props.navigation.navigate('Register')
						}}
						onFinish={() => {
							this.props.navigation.navigate('ShopList')
						}}
					/>
				)}
			</LoginController>
		)
	}
}

export default LoginView
