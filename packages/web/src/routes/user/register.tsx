import React from 'react'
import { Card, Form, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { RouteComponentProps } from 'react-router'
import { RegisterController } from '@canteen/common'

interface IProps extends RouteComponentProps {
	form: WrappedFormUtils
}

const Register = ({ form }: IProps) => {
	const { validateFields } = form

	return (
		<RegisterController>
			{({ submit }) => (
				<Card
					title="登录"
					headStyle={{ textAlign: 'center' }}
					style={{ width: 500, margin: 'auto', marginTop: 100 }}
					actions={[
						<Button
							onClick={() => {
								validateFields((err, values) => {
									if (!err) {
										console.log(values)
										submit({ data: values })
									}
								})
							}}
							type="primary"
							ghost={true}
							key="register"
						>
							注册
						</Button>,
						<Button type="primary" ghost={true} key="cancel">
							取消
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
