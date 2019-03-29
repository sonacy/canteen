import React from 'react'
import { Formik, Field } from 'formik'
import { Card, Button } from 'react-native-elements'
import { View } from 'react-native'
import { InputField } from '../../../components/InputField'
import Spinner from 'react-native-loading-spinner-overlay'
import { LoginMutationVariables } from '@canteen/common/dist/types/LoginMutation'
import { loginValidation } from './loginValidation'

interface FormValues {
	name: string
	password: string
}

interface IProps {
	submit: (
		values: LoginMutationVariables
	) => Promise<{
		errors?:
			| {
					[key: string]: string
			  }[]
			| undefined
		data?: any
	}>
	onFinish: () => void
	goToRegister: () => void
	loading: boolean
}

const LoginForm = ({ submit, onFinish, loading, goToRegister }: IProps) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Spinner visible={loading} size='large' />
			<Card title='登录'>
				<Formik<FormValues>
					validationSchema={loginValidation}
					initialValues={{ name: '', password: '' }}
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
								placeholder='用户名'
							/>
							<Field
								secureTextEntry={true}
								name='password'
								component={InputField}
								placeholder='密码'
							/>
							<Button
								onPress={handleSubmit}
								title='登录'
								type='solid'
								style={{
									marginHorizontal: 24,
									marginTop: 24,
								}}
							/>
							<Button
								onPress={goToRegister}
								title='前往注册'
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

export default LoginForm
