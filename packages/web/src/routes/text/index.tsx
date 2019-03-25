import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Alert, Card } from 'antd'

const TextPage = ({ location: { state } }: RouteComponentProps) => {
	return (
		<Alert
			style={{
				width: 500,
				height: 100,
				margin: 'auto',
				marginTop: 100,
				fontSize: 24,
				fontWeight: 400,
			}}
			type="success"
			message={state}
		/>
	)
}

export default TextPage
