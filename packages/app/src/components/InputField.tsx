import * as React from 'react'
import { FieldProps } from 'formik'
import { Input } from 'react-native-elements'

const errStyle = {
	color: 'red',
}

export class InputField extends React.Component<
	FieldProps<any> & {
		iconType: string
	}
> {
	onChangeText = (text: string) => {
		const {
			form: { setFieldValue },
			field: { name },
		} = this.props
		setFieldValue(name, text)
	}

	render() {
		const {
			iconType = 'smileo',
			field,
			form: { touched, errors },
			...props
		} = this.props
		const errorMsg = touched[field.name]
			? (errors[field.name] as string)
			: undefined

		return (
			<Input
				{...props}
				containerStyle={{
					width: '90%',
					marginLeft: '5%',
					marginBottom: 24,
				}}
				leftIcon={{ type: 'antdesign', name: iconType, color: '#ccc' }}
				inputContainerStyle={{
					paddingRight: 12,
					borderWidth: 1,
					borderColor: '#ccc',
					borderRadius: 5,
				}}
				inputStyle={{
					marginLeft: 8,
				}}
				errorStyle={errStyle}
				errorMessage={errorMsg}
				onChangeText={this.onChangeText}
				value={field.value}
			/>
		)
	}
}
