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
							const nextRoute = this.props.navigation.getParam(
								'next',
								'ShopList'
							)
							let rest = {}
							if (
								this.props.navigation.state.params &&
								this.props.navigation.state.params.next
							) {
								const { next, ...other } = this.props.navigation.state
									.params as any
								rest = other
							}

							this.props.navigation.navigate(nextRoute, rest)
						}}
					/>
				)}
			</LoginController>
		)
	}
}

export default LoginView
