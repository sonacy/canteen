import React from 'react'
import { Card, Button, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { DropzoneField } from 'components/form/DropZone'
import FormHidden from 'components/form/FormHidden'

interface IProps extends FormComponentProps {
	id: string
	submit: (values: any) => Promise<any>
	onFinish: () => void
}

const UploadPicsForm = ({ form, id, submit, onFinish }: IProps) => {
	const { validateFields, getFieldValue, setFields } = form

	return (
		<Card
			title="上传图片"
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
					key="ok"
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
				<FormHidden field="id" initialValue={id} form={form} />
				<DropzoneField form={form} field="pics" label="图片" />
			</Form>
		</Card>
	)
}

export default Form.create()(UploadPicsForm)
