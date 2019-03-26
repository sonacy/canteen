import React from 'react'
import { Card, Button, Form } from 'antd'
import { RouteComponentProps } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import FormInput from 'components/form/FormInput'
import { ShopCreateController } from '@canteen/common'
import { DropzoneField } from 'components/form/DropZone'

interface IProps extends RouteComponentProps {
	form: WrappedFormUtils
}

const ShopCreate = ({ form, history }: IProps) => {
	const { validateFields, getFieldValue, setFields } = form

	return (
		<ShopCreateController>
			{({ submit }) => (
				<Card
					title="添加商店"
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
											history.push('/shop/list')
										}
									}
								})
							}}
							type="primary"
							ghost={true}
							key="login"
						>
							确认
						</Button>,
						<Button
							type="primary"
							ghost={true}
							key="register"
							onClick={() => {
								history.push('/register')
							}}
						>
							取消
						</Button>,
					]}
				>
					<Form>
						<FormInput
							form={form}
							field="name"
							label="商店名称"
							required={true}
						/>
						<FormInput
							form={form}
							field="address"
							label="地址"
							required={true}
						/>
						<FormInput form={form} field="phone" label="电话" />
						<DropzoneField form={form} field="pics" label="图片" />
					</Form>
				</Card>
			)}
		</ShopCreateController>
	)
}

export default Form.create()(ShopCreate)
