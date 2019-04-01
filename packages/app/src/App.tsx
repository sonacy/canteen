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
import { TouchableOpacity } from 'react-native'
import { LogoutController } from '@canteen/common'

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
    ShopDetail: ShopDetail,
    ShopCreate: ShopCreate,
    ShopUpdate: ShopUpdate,
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
      },
      headerRight: (
        <LogoutController>
          {({ submit }) => {
            return (
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={async () => {
                  await submit({})
                  navigation.navigate('Login')
                }}
              >
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
