import React from 'react'
import { Card, Form, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { RouteComponentProps } from 'react-router'
import { LoginController } from '@canteen/common'

interface IProps extends RouteComponentProps {
	form: WrappedFormUtils
}

const Login = ({ form, history, location }: IProps) => {
	const { validateFields, setFields, getFieldValue } = form

	return (
		<LoginController>
			{({ submit, client }) => (
				<Card
					title="登录"
					headStyle={{ textAlign: 'center' }}
					style={{ width: 500, margin: 'auto', marginTop: 100 }}
					actions={[
						<Button
							onClick={() => {
								validateFields(async (err, values) => {
									if (!err) {
										const res = await submit(values)
										if (res.errors) {
											res.errors.forEach(item => {
												const key = Object.keys(item)[0]
												const value = getFieldValue(key)
												if (value) {
													setFields({
														[key]: {
															value,
															errors: [new Error(item[key])],
														},
													})
												}
											})
										} else {
											await client.resetStore()
											const next = location.state ? location.state.next : '/'
											history.push(next)
										}
									}
								})
							}}
							type="primary"
							ghost={true}
							key="login"
						>
							登录
						</Button>,
						<Button
							type="primary"
							ghost={true}
							key="register"
							onClick={() => {
								history.push('/register')
							}}
						>
							注册
						</Button>,
						<Button
							type="primary"
							ghost={true}
							key="forget"
							onClick={() => {
								history.push('/forget-password')
							}}
						>
							忘记密码
						</Button>,
					]}
				>
					<Form>
						<FormInput
							form={form}
							field="name"
							label="用户名"
							required={true}
						/>
						<FormInput
							form={form}
							field="password"
							label="密码"
							type="password"
							required={true}
						/>
					</Form>
				</Card>
			)}
		</LoginController>
	)
}

export default Form.create()(Login)
