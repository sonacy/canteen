import React from 'react'
import { Card, Form, Button, notification } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { RouteComponentProps } from 'react-router'
import { ChangePasswordController } from '@canteen/common'

interface IProps extends RouteComponentProps<{ token: string }> {
	form: WrappedFormUtils
}

const ChangePassword = ({ form, history, match }: IProps) => {
	const { validateFields, setFields, getFieldValue } = form

	return (
		<ChangePasswordController>
			{({ submit }) => (
				<Card
					title="修改密码"
					headStyle={{ textAlign: 'center' }}
					style={{ width: 500, margin: 'auto', marginTop: 100 }}
					actions={[
						<Button
							onClick={() => {
								validateFields(async (err, values) => {
									if (!err) {
										const { token } = match.params
										const res = await submit({ token, ...values })
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
											notification.success({
												message: '修改密码成功!',
											})
											history.push('/shop/list')
										}
									}
								})
							}}
							type="primary"
							ghost={true}
							key="ChangePassword"
						>
							确认
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
						<FormInput
							form={form}
							field="newPassword"
							label="新密码"
							type="password"
							required={true}
						/>
					</Form>
				</Card>
			)}
		</ChangePasswordController>
	)
}

export default Form.create()(ChangePassword)
