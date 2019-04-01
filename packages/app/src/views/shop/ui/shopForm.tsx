import React from 'react'
import { Formik, Field } from 'formik'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { InputField } from '../../../components/InputField'
import Spinner from 'react-native-loading-spinner-overlay'
import { UploadField } from '../../../components/UploadField'
import { UpdateShopMutationVariables } from '@canteen/common/dist/types/updateShopMutation'

interface FormValues {
  name: string
  address: string
  phone: string
  pics: any[]
}

interface IProps {
  shop?: UpdateShopMutationVariables
  submit: (
    values: any
  ) => Promise<{
    errors?:
      | {
          [key: string]: string
        }[]
      | undefined
    data?: any
  }>
  onFinish: () => void
  loading: boolean
}

const ShopForm = ({ submit, onFinish, loading, shop }: IProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Spinner visible={loading} size='large' />
      <Formik<FormValues>
        initialValues={{
          address: shop ? shop.address : '',
          name: shop ? shop.name : '',
          phone: shop ? shop.phone : '',
          pics: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          const data = await submit(
            shop
              ? {
                  ...shop,
                  ...values,
                }
              : values
          )
          if (data.errors) {
            const errors: any = {}
            data.errors.forEach(x => {
              const key = Object.keys(x)[0]
              errors[key] = x[key]
            })
            setErrors(errors)
          } else {
            onFinish()
          }
        }}
        render={({ handleSubmit }) => (
          <>
            <Field
              autoCapitalize='none'
              name='name'
              component={InputField}
              placeholder='店面'
              iconType='home'
            />
            <Field
              name='address'
              autoCapitalize='none'
              component={InputField}
              placeholder='地址'
              iconType='enviromento'
            />
            <Field
              autoCapitalize='none'
              name='phone'
              component={InputField}
              placeholder='电话'
              iconType='mobile1'
            />
            {!shop && (
              <Field
                style={{ margin: 12 }}
                name='pics'
                component={UploadField}
              />
            )}

            <Button
              style={{
                marginTop: 12,
                marginHorizontal: '5%',
              }}
              onPress={handleSubmit}
              title='确定'
            />
          </>
        )}
      />
    </View>
  )
}

export default ShopForm
