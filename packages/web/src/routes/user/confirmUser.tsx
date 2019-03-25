import React from 'react'
import { ConfirmUserController } from '@canteen/common'
import { Card, Button, notification } from 'antd'
import { RouteComponentProps } from 'react-router'

const ConfirmUser = ({
	history,
	match,
}: RouteComponentProps<{ token: string }>) => {
	return (
		<ConfirmUserController>
			{({ submit }) => (
				<Card
					title="注册验证"
					headStyle={{ textAlign: 'center' }}
					style={{
						width: 500,
						margin: 'auto',
						marginTop: 100,
						textAlign: 'center',
					}}
				>
					<Button
						onClick={async () => {
							const { token } = match.params
							const res = await submit({ token })

							if (!res.data.data.confirmUser) {
								notification.error({
									message: '验证失效，请重新注册!',
								})
								history.push('/register')
							} else {
								notification.success({
									message: '注册成功，请登录!',
								})
								history.push('/login')
							}
						}}
						type="primary"
						ghost={true}
						key="login"
					>
						验证
					</Button>
				</Card>
			)}
		</ConfirmUserController>
	)
}

export default ConfirmUser
