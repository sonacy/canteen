import React from 'react'
import { Formik, Field } from 'formik'
import { Button, Card } from 'react-native-elements'
import { View } from 'react-native'
import { InputField } from '../../../components/InputField'
import Spinner from 'react-native-loading-spinner-overlay'
import { CreateShopMutationVariables } from '@canteen/common/dist/types/CreateShopMutation'
import { UploadField } from '../../../components/UploadField'

interface FormValues {
	name: string
	address: string
	phone: string
	pics: any[]
}

interface IProps {
	submit: (
		values: CreateShopMutationVariables
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

const ShopForm = ({ submit, onFinish, loading }: IProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Spinner visible={loading} size='large' />
			<Card>
				<Formik<FormValues>
					initialValues={{ address: '', name: '', phone: '', pics: [] }}
					onSubmit={async (values, { setErrors }) => {
						const data = await submit(values)
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
							/>
							<Field
								name='address'
								autoCapitalize='none'
								component={InputField}
								placeholder='地址'
							/>
							<Field
								autoCapitalize='none'
								name='phone'
								component={InputField}
								placeholder='电话'
							/>
							<Field
								style={{ margin: 12 }}
								title='上传图片'
								name='pics'
								component={UploadField}
							/>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}>
								<Button onPress={handleSubmit} title='确定' />
								<Button onPress={onFinish} title='取消' />
							</View>
						</>
					)}
				/>
			</Card>
		</View>
	)
}

export default ShopForm
