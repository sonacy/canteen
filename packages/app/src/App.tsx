import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Button } from 'react-native-elements'
import {
	createAppContainer,
	NavigationScreenProps,
	SafeAreaView,
	createStackNavigator,
} from 'react-navigation'
import { Text } from 'react-native'
import RegisterView from './views/register'
import { client } from './apollo'
import AlertView from './views/alert'

class ShopScreen extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: 'shop',
	}

	render() {
		return (
			<SafeAreaView>
				<Text>shop view</Text>
				<Button
					title='go to user'
					onPress={() => this.props.navigation.navigate('User')}
				/>
			</SafeAreaView>
		)
	}
}

const stack = createStackNavigator(
	{
		Shop: ShopScreen,
		User: RegisterView,
		Msg: AlertView,
	},
	{
		initialRouteName: 'User',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#d32323',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
	}
)

const Routes = createAppContainer(stack)

export default class App extends React.PureComponent {
	render() {
		return (
			<ApolloProvider client={client}>
				<Routes />
			</ApolloProvider>
		)
	}
}
