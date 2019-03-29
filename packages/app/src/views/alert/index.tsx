import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Button, Text } from 'react-native-elements'
import { View } from 'react-native'

class AlertView extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '提示',
	}

	render() {
		const { navigation } = this.props
		const msg = navigation.getParam('msg', '出错了！')
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text
					style={{
						color: '#d32323',
						fontSize: 24,
						fontWeight: '700',
						height: 48,
						lineHeight: 48,
					}}>
					{msg}
				</Text>
				<Button
					raised={true}
					title='返回上级'
					onPress={() => {
						navigation.goBack()
					}}
				/>
			</View>
		)
	}
}

export default AlertView
