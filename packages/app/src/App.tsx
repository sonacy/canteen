import React from 'react'
import { ApolloProvider } from 'react-apollo'
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator,
} from 'react-navigation'
import RegisterView from './views/register'
import { client } from './apollo'
import AlertView from './views/alert'
import LoginView from './views/login'
import ShopList from './views/shop/list'

const UserStack = createStackNavigator(
	{
		Register: RegisterView,
		Login: LoginView,
		Msg: AlertView,
	},
	{
		initialRouteName: 'Login',
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

const AppStack = createStackNavigator(
	{
		ShopList: ShopList,
	},
	{
		initialRouteName: 'ShopList',
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

const stack = createSwitchNavigator(
	{
		User: UserStack,
		App: AppStack,
	},
	{
		initialRouteName: 'App',
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
