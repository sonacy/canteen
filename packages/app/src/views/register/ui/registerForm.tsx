import React from 'react'
import { Formik, Field } from 'formik'
import { Card, Button } from 'react-native-elements'
import { View } from 'react-native'
import { InputField } from '../../../components/InputField'
import { RegisterMutationVariables } from '@canteen/common/dist/types/RegisterMutation'
import { registerValidation } from './registerValidation'
import Spinner from 'react-native-loading-spinner-overlay'

interface FormValues {
	name: string
	email: string
	password: string
}

interface IProps {
	submit: (
		values: RegisterMutationVariables
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

const RegisterForm = ({ submit, onFinish, loading }: IProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Spinner visible={loading} size='large' />
			<Card title='注册'>
				<Formik<FormValues>
					validationSchema={registerValidation}
					initialValues={{ email: '', name: '', password: '' }}
					onSubmit={async (values, { setErrors }) => {
						const data = await submit({ data: values })
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
								placeholder='姓名'
							/>
							<Field
								name='email'
								autoCapitalize='none'
								component={InputField}
								placeholder='邮箱'
							/>
							<Field
								secureTextEntry={true}
								name='password'
								component={InputField}
								placeholder='密码'
							/>
							<Button
								onPress={handleSubmit}
								title='注册'
								type='solid'
								style={{
									marginHorizontal: 24,
									marginTop: 24,
								}}
							/>
							<Button
								onPress={onFinish}
								title='返回登录'
								type='clear'
								style={{
									alignItems: 'flex-end',
									marginRight: 24,
									marginTop: 12,
								}}
								titleStyle={{
									color: '#999',
								}}
							/>
						</>
					)}
				/>
			</Card>
		</View>
	)
}

export default RegisterForm
