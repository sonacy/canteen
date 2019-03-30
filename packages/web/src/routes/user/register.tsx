import React from 'react'
import { Card, Form, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { RouteComponentProps } from 'react-router'
import { RegisterController } from '@canteen/common'

interface IProps extends RouteComponentProps {
	form: WrappedFormUtils
}

const Register = ({ form, history }: IProps) => {
	const { validateFields, setFields, getFieldValue } = form

	return (
		<RegisterController>
			{({ submit }) => (
				<Card
					title="注册"
					headStyle={{ textAlign: 'center' }}
					style={{ width: 500, margin: 'auto', marginTop: 100 }}
					actions={[
						<Button
							onClick={() => {
								validateFields(async (err, values) => {
									if (!err) {
										const res = await submit({ data: values })
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
											history.push('/m/register-success', '请登录邮箱完成注册!')
										}
									}
								})
							}}
							type="primary"
							ghost={true}
							key="register"
						>
							注册
						</Button>,
						<Button
							type="primary"
							ghost={true}
							key="login"
							onClick={() => {
								history.push('/login')
							}}
						>
							返回登录
						</Button>,
					]}
				>
					<Form>
						<FormInput form={form} field="name" label="姓名" required={true} />
						<FormInput
							form={form}
							field="email"
							label="邮箱"
							required={true}
							rules={[
								{
									type: 'email',
									message: '邮箱格式不正确!',
								},
							]}
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
		</RegisterController>
	)
}

export default Form.create()(Register)
