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
	backToLogin: () => void
	loading: boolean
}

const RegisterForm = ({ submit, onFinish, loading, backToLogin }: IProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Spinner visible={loading} size='large' />
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
							iconType='user'
						/>
						<Field
							keyboardType='email-address'
							name='email'
							autoCapitalize='none'
							component={InputField}
							placeholder='邮箱'
							iconType='mail'
						/>
						<Field
							secureTextEntry={true}
							name='password'
							component={InputField}
							placeholder='密码'
							iconType='lock'
						/>
						<Button
							onPress={handleSubmit}
							title='注册'
							type='solid'
							containerStyle={{
								marginHorizontal: '5%',
								marginTop: 12,
							}}
						/>
						<Button
							onPress={backToLogin}
							title='返回登录'
							type='clear'
							containerStyle={{
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
		</View>
	)
}

export default RegisterForm
