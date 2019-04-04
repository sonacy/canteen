import React from 'react'
import { Spin } from 'antd'
import styles from './index.styl'

export const Spinner = ({ loading }: { loading: boolean }) => {
	return (
		<div
			className={styles.loadingContainer}
			style={{
				display: loading ? 'block' : 'none',
			}}
		>
			<Spin
				size="large"
				spinning={loading}
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					zIndex: 9999,
				}}
			/>
		</div>
	)
}
