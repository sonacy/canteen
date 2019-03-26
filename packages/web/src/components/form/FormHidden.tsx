import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

interface IProps {
	form: any
	initialValue?: any
	field: string
}

const FormHidden = ({ form, initialValue, field }: IProps) => {
	const { getFieldDecorator } = form
	return (
		<FormItem style={{ height: 0 }}>
			{getFieldDecorator(field, {
				initialValue,
			})(<Input type="hidden" />)}
		</FormItem>
	)
}

export default FormHidden
