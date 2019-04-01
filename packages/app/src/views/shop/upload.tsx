import React from 'react'
import { ShopPicsUploadController } from '@canteen/common'
import { NavigationScreenProps } from 'react-navigation'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Formik, Field } from 'formik'
import { UploadField } from '../../components/UploadField'
import { Button } from 'react-native-elements'

interface FormValues {
  pics: any[]
}

class ShopUpload extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    title: '上传店铺图片',
  }

  render() {
    const id = this.props.navigation.getParam('id', null)

    return (
      <ShopPicsUploadController
        onAuthError={() => {
          this.props.navigation.navigate('Login', {
            next: 'ShopDetail',
            id: id,
          })
        }}
      >
        {({ submit, loading }) => (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Spinner visible={loading} size='large' />
            <Formik<FormValues>
              initialValues={{
                pics: [],
              }}
              onSubmit={async (values, { setErrors }) => {
                const data = await submit({
                  id,
                  ...values,
                })
                if (data.errors) {
                  const errors: any = {}
                  data.errors.forEach(x => {
                    const key = Object.keys(x)[0]
                    errors[key] = x[key]
                  })
                  setErrors(errors)
                } else {
                  this.props.navigation.navigate('ShopDetail', {
                    id,
                  })
                }
              }}
              render={({ handleSubmit }) => (
                <>
                  <Field
                    style={{ margin: 12 }}
                    name='pics'
                    component={UploadField}
                  />

                  <Button
                    style={{
                      marginTop: 12,
                      marginHorizontal: '5%',
                    }}
                    onPress={handleSubmit}
                    title='上传'
                  />
                </>
              )}
            />
          </View>
        )}
      </ShopPicsUploadController>
    )
  }
}

export default ShopUpload
