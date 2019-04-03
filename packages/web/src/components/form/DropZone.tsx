import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Form } from 'antd'
import { WrappedFormUtils, ValidationRule } from 'antd/lib/form/Form'

const FormItem = Form.Item

const baseStyle = {
	width: '100%',
	height: 100,
	borderWidth: 2,
	borderColor: '#666',
	borderStyle: 'dashed',
	borderRadius: 5,
}

const activeStyle = {
	borderStyle: 'solid',
	borderColor: '#6c6',
	backgroundColor: '#eee',
}

const acceptStyle = {
	borderStyle: 'solid',
	borderColor: '#00e676',
}

const rejectStyle = {
	borderStyle: 'solid',
	borderColor: '#ff1744',
}

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
}

const img = {
	display: 'block',
	width: 'auto',
	height: '100%',
}

interface IProps {
	form: WrappedFormUtils
	field: string
	label: string
	labelCol?: number
	required?: boolean
	disabled?: boolean
	rules?: ValidationRule[]
}

export const DropzoneField = ({
	form,
	field,
	label,
	labelCol = 6,
	required = false,
	disabled = false,
	rules = [],
}: IProps) => {
	const { getFieldDecorator, setFieldsValue } = form
	const [files, setFiles] = useState<Array<File & { preview: string }>>([])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		multiple: true,
		accept: 'image/*',
		onDrop: acceptedFiles => {
			const addFiles = acceptedFiles.filter(
				x => !files.find(f => f.name === x.name)
			)
			const value = [
				...addFiles.map(file =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
				...files,
			]
			setFieldsValue({
				[field]: value,
			})
			setFiles(value)
		},
	})

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject]
	)

	const thumbs = files.map(file => (
		<div
			style={{
				display: 'inline-flex',
				borderRadius: 2,
				border: '1px solid #eaeaea',
				marginBottom: 8,
				marginRight: 8,
				width: 80,
				height: 100,
				padding: 4,
				boxSizing: 'border-box',
			}}
			key={file.name}
		>
			<div style={thumbInner}>
				<img src={file.preview} style={img} />
			</div>
		</div>
	))

	return (
		<FormItem
			label={label}
			labelCol={{ span: labelCol }}
			wrapperCol={{ span: 24 - labelCol }}
		>
			{getFieldDecorator(field, {
				initialValue: [],
				rules: [{ required, message: `${label}不能为空!` }, ...rules],
			})(
				<section>
					<div {...getRootProps({ style })}>
						<input {...getInputProps({ disabled })} />
						<p style={{ textAlign: 'center' }}>拖拽或点击上传文件</p>
					</div>
					<aside
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							marginTop: 16,
						}}
					>
						{thumbs}
					</aside>
				</section>
			)}
		</FormItem>
	)
}
