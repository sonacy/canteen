import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const AddFood = gql`
	mutation CreateFood(
		$name: String!
		$price: Float!
		$calories: Float!
		$pics: [Upload!]!
		$shopId: String!
	) {
		createFood(
			name: $name
			price: $price
			calories: $calories
			pics: $pics
			shopId: $shopId
		) {
			name
			price
			calories
			pics
			shop {
				name
			}
		}
	}
`

const About = () => {
	const [file, setFile] = useState<FileList | null>(null)

	return (
		<Mutation mutation={AddFood}>
			{(addFood, { data }) => {
				return (
					<form
						onSubmit={e => {
							e.preventDefault()

							addFood({
								variables: {
									name: 'noodles',
									pics: file,
									price: 12.5,
									calories: 234,
									shopId: '1',
								},
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
						<button type="submit">Add food</button>
					</form>
				)
			}}
		</Mutation>
	)
}

export default About
