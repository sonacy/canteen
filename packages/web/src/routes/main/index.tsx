import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const AddShop = gql`
	mutation CreateShop(
		$name: String!
		$address: String
		$phone: String
		$pics: [Upload!]!
	) {
		createShop(name: $name, address: $address, phone: $phone, pics: $pics) {
			name
		}
	}
`

const Main = () => {
	const [file, setFile] = useState<FileList | null>(null)

	return (
		<Mutation mutation={AddShop}>
			{(addShop, { data }) => {
				return (
					<form
						onSubmit={e => {
							e.preventDefault()

							addShop({
								variables: { name: 'sadas', pics: file },
							})
						}}
					>
						<input
							multiple={true}
							required={true}
							type="file"
							onChange={({ target: { validity, files } }) =>
								validity.valid && setFile(files)
							}
						/>
						<button type="submit">Add shop</button>
					</form>
				)
			}}
		</Mutation>
	)
}

export default Main
