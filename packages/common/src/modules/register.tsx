import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
	RegisterMutationVariables,
	RegisterMutation,
} from '../types/RegisterMutation'

const registerMutation = gql`
	mutation RegisterMutation($data: RegisterInput!) {
		register(data: $data) {
			name
			email
		}
	}
`

interface IProps {
	children: (data: {
		submit: (values: RegisterMutationVariables) => Promise<void>
	}) => JSX.Element | null
}

export const RegisterController = ({ children }: IProps) => {
	return (
		<Mutation<RegisterMutation, RegisterMutationVariables>
			mutation={registerMutation}>
			{register => {
				return children({
					submit: async values => {
						const data = await register({
							variables: values,
						})
						console.log(data)
					},
				})
			}}
		</Mutation>
	)
}
