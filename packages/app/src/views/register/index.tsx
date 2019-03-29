import React from 'react'
import { RegisterController } from '@canteen/common'
import RegisterForm from './ui/registerForm'
import { NavigationScreenProps } from 'react-navigation'

class RegisterView extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '注册',
	}

	render() {
		return (
			<RegisterController>
				{({ submit, loading }) => (
					<RegisterForm
						loading={!!loading}
						submit={submit}
						onFinish={() => {
							this.props.navigation.navigate('Msg', {
								msg: '请登录邮箱完成验证!',
							})
						}}
					/>
				)}
			</RegisterController>
		)
	}
}

export default RegisterView
