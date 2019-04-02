import React from 'react'
import { Formik, Field } from 'formik'
import { Button } from 'react-native-elements'
import { View } from 'react-native'
import { InputField } from '../../../components/InputField'
import Spinner from 'react-native-loading-spinner-overlay'
import { UploadField } from '../../../components/UploadField'
import { UpdateFoodMutationVariables } from '@canteen/common/dist/types/UpdateFoodMutation'

interface FormValues {
	name: string
	price: string
	calories: string
	pics: any[]
}

interface IProps {
	shopId: string
	food?: UpdateFoodMutationVariables
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

const FoodForm = ({ submit, onFinish, loading, food, shopId }: IProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Spinner visible={loading} size='large' />
			<Formik<FormValues>
				initialValues={{
					name: food ? food.name : '',
					price: food ? food.price.toString() : '',
					calories: food ? food.calories.toString() : '',
					pics: [],
				}}
				onSubmit={async (values, { setErrors }) => {
					const params = {
						name: values.name,
						price: parseFloat(values.price),
						calories: parseFloat(values.calories),
						pics: values.pics,
					}
					const data = await submit(
						food
							? {
									...food,
									...params,
									shopId,
							  }
							: { ...params, shopId }
					)
					console.log(data)

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
							placeholder='食物名称'
							iconType='menuunfold'
							autoCorrect={false}
						/>
						<Field
							name='price'
							component={InputField}
							placeholder='价格'
							iconType='pay-circle-o1'
							keyboardType='numeric'
						/>
						<Field
							name='calories'
							component={InputField}
							placeholder='卡路里'
							iconType='rocket1'
						/>
						<Field style={{ margin: 12 }} name='pics' component={UploadField} />

						<Button
							containerStyle={{
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

export default FoodForm
