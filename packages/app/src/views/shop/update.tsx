import React from 'react'
import { ShopUpdateController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import ShopForm from './ui/shopForm'

class ShopUpdate extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: '编辑店铺',
  }

  render() {
    const shop = this.props.navigation.getParam('shop', {})

    return (
      <ShopUpdateController
        onAuthError={() => {
          this.props.navigation.navigate('Login', {
            next: 'ShopDetail',
            id: shop.id,
          })
        }}
      >
        {({ submit, loading }) => (
          <ShopForm
            shop={shop}
            loading={!!loading}
            submit={submit}
            onFinish={() => {
              this.props.navigation.navigate('ShopDetail', {
                id: shop.id,
              })
            }}
          />
        )}
      </ShopUpdateController>
    )
  }
}

export default ShopUpdate
