import React from 'react'
import { Form, InputNumber } from 'antd'
import { WrappedFormUtils, ValidationRule } from 'antd/lib/form/Form'

interface IProps {
	form: WrappedFormUtils
	field: string
	label: string
	labelCol?: number
	initialValue?: number
	required?: boolean
	disabled?: boolean
	placeholder?: string
	rules?: ValidationRule[]
	check?: (qs: object) => Promise<object>
	type?: string
}

const FormNumber = ({
	form,
	field,
	label,
	labelCol = 6,
	initialValue = 0,
	required = false,
	disabled = false,
	placeholder = `请输入${label}`,
	rules = [],
	check,
	...rest
}: IProps) => {
	const { getFieldDecorator, getFieldValue, setFields } = form

	const handleBlur = () => {
		const obj = Object.create(null)
		const value = getFieldValue(field)
		obj[field] = value
		if (check && value) {
			check(obj).then(result => {
				if (result) {
					const errors = [new Error(`该${label}已存在，请重新输入`)]
					obj[field] = {
						value,
						errors,
					}
				} else {
					obj[field] = {
						value,
					}
				}
				setFields(obj)
			})
		}
	}

	return (
		<Form.Item
			label={label}
			labelCol={{ span: labelCol }}
			wrapperCol={{ span: 24 - labelCol }}
		>
			{getFieldDecorator(field, {
				initialValue,
				rules: [{ required, message: `${label}不能为空!` }, ...rules],
			})(
				<InputNumber
					disabled={disabled}
					placeholder={placeholder}
					onBlur={handleBlur}
					{...rest}
				/>
			)}
		</Form.Item>
	)
}

export default FormNumber
