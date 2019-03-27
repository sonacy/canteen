import React from 'react'
import { Card, Button, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import FormInput from 'components/form/FormInput'
import { DropzoneField } from 'components/form/DropZone'
import FormHidden from 'components/form/FormHidden'
import FormNumber from 'components/form/FormNumber'

interface IProps extends FormComponentProps {
	food?: {
		id: string
		name: string
		price: number
		calories: number
	}
	submit: (values: any) => Promise<any>
	onFinish: () => void
	shopId: string
}

const FoodForm = ({ form, food, submit, onFinish, shopId }: IProps) => {
	const { validateFields, getFieldValue, setFields } = form

	return (
		<Card
			title={`${food ? '修改' : '添加'}食物`}
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
				{food && <FormHidden field="id" initialValue={food.id} form={form} />}
				<FormHidden field="shopId" initialValue={shopId} form={form} />
				<FormInput
					initialValue={food ? food.name : ''}
					form={form}
					field="name"
					label="食物名称"
					required={true}
				/>
				<FormNumber
					initialValue={food ? food.price : 0}
					form={form}
					field="price"
					label="价格"
					required={true}
				/>
				<FormNumber
					initialValue={food ? food.calories : 0}
					form={form}
					field="calories"
					label="热量"
				/>
				{!food && <DropzoneField form={form} field="pics" label="图片" />}
			</Form>
		</Card>
	)
}

export default Form.create()(FoodForm)
