import React from 'react'
import { ShopCreateController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import ShopForm from './ui/shopForm'

class ShopCreate extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: '创建店铺',
  }

  render() {
    return (
      <ShopCreateController
        onAuthError={() => {
          this.props.navigation.navigate('Login', {
            next: 'ShopList',
          })
        }}
      >
        {({ submit, loading }) => (
          <ShopForm
            loading={!!loading}
            submit={submit}
            onFinish={() => {
              this.props.navigation.navigate('ShopList')
            }}
          />
        )}
      </ShopCreateController>
    )
  }
}

export default ShopCreate
