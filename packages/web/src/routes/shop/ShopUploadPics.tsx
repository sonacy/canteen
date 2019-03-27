import React from 'react'
import { RouteComponentProps } from 'react-router'
import { ShopPicsUploadController } from '@canteen/common'
import UploadPicsForm from './components/UploadPicsForm'

const ShopUploadPics = ({
	history,
	match,
}: RouteComponentProps<{ id: string }>) => {
	const id = match.params.id
	return (
		<ShopPicsUploadController>
			{({ submit }) => (
				<UploadPicsForm
					id={id}
					submit={submit}
					onFinish={() => {
						history.push(`/shop/detail/${id}`)
					}}
				/>
			)}
		</ShopPicsUploadController>
	)
}

export default ShopUploadPics
