import React from 'react'
import { Card, Button, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import FormInput from 'components/form/FormInput'
import { DropzoneField } from 'components/form/DropZone'
import FormHidden from 'components/form/FormHidden'

interface IProps extends FormComponentProps {
	shop?: {
		id: string
		name: string
		address: string
		phone: string
	}
	submit: (values: any) => Promise<any>
	onFinish: () => void
}

const ShopForm = ({ form, shop, submit, onFinish }: IProps) => {
	const { validateFields, getFieldValue, setFields } = form

	return (
		<Card
			title={`${shop ? '修改' : '添加'}商店`}
			headStyle={{ textAlign: 'center' }}
			style={{ width: 500, margin: 'auto', marginTop: 100 }}
			actions={[
				<Button
					onClick={() => {
						validateFields(async (err, values) => {
							if (!err) {
								const res = await submit(values)
								if (res.errors) {
									res.errors.forEach((item: any) => {
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
									onFinish()
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
					key="cancel"
					onClick={() => {
						onFinish()
					}}
				>
					取消
				</Button>,
			]}
		>
			<Form>
				{shop && <FormHidden field="id" initialValue={shop.id} form={form} />}
				<FormInput
					initialValue={shop ? shop.name : ''}
					form={form}
					field="name"
					label="商店名称"
					required={true}
				/>
				<FormInput
					initialValue={shop ? shop.address : ''}
					form={form}
					field="address"
					label="地址"
					required={true}
				/>
				<FormInput
					initialValue={shop ? shop.phone : ''}
					form={form}
					field="phone"
					label="电话"
				/>
				{!shop && <DropzoneField form={form} field="pics" label="图片" />}
			</Form>
		</Card>
	)
}

export default Form.create()(ShopForm)
