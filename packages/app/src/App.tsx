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
import ShopDetail from './views/shop/detail'
import ShopCreate from './views/shop/create'
import ShopUpdate from './views/shop/update'
import { Icon } from 'react-native-elements'
import { TouchableOpacity, Alert } from 'react-native'
import { LogoutController } from '@canteen/common'
import ShopUpload from './views/shop/upload'
import FoodCreate from './views/food/create'
import FoodUpdate from './views/food/update'

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
				textAlign: 'center',
				flex: 1,
			},
		},
	}
)

const AppStack = createStackNavigator(
	{
		ShopList: ShopList,
		ShopDetail: ShopDetail,
		ShopCreate: ShopCreate,
		ShopUpdate: ShopUpdate,
		ShopUpload: ShopUpload,
		FoodCreate: FoodCreate,
		FoodUpdate: FoodUpdate,
	},
	{
		initialRouteName: 'ShopList',
		defaultNavigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#d32323',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
				textAlign: 'center',
				flex: 1,
			},
			headerBackTitle: ' ',
			headerRight: (
				<LogoutController>
					{({ submit }) => {
						return (
							<TouchableOpacity
								style={{ marginRight: 12 }}
								onPress={() => {
									Alert.alert('登出', '确定退出账号登录吗?', [
										{ text: '取消' },
										{
											text: '确定',
											onPress: async () => {
												await submit({})
												navigation.navigate('Login')
											},
										},
									])
								}}>
								<Icon type='antdesign' name='logout' color='#fff' size={18} />
							</TouchableOpacity>
						)
					}}
				</LogoutController>
			),
		}),
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
