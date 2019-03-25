import React from 'react'
import { Card, Form, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { RouteComponentProps } from 'react-router'
import { ForgetPasswordController } from '@canteen/common'

interface IProps extends RouteComponentProps {
	form: WrappedFormUtils
}

const ForgetPassword = ({ form, history }: IProps) => {
	const { validateFields, setFields, getFieldValue } = form

	return (
		<ForgetPasswordController>
			{({ submit }) => (
				<Card
					title="忘记密码"
					headStyle={{ textAlign: 'center' }}
					style={{ width: 500, margin: 'auto', marginTop: 100 }}
					actions={[
						<Button
							onClick={() => {
								validateFields(async (err, values) => {
									if (!err) {
										const res = await submit(values)

										if (res.data.data.forgotPassword) {
											history.push('/m/change-password', '登录邮箱完成修改密码')
										} else {
											const value = getFieldValue('email')
											setFields({
												email: {
													value,
													errors: [new Error('邮箱没有被注册！')],
												},
											})
										}
									}
								})
							}}
							type="primary"
							ghost={true}
							key="ForgetPassword"
						>
							修改密码
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
							field="email"
							label="注册邮箱"
							required={true}
						/>
					</Form>
				</Card>
			)}
		</ForgetPasswordController>
	)
}

export default Form.create()(ForgetPassword)
