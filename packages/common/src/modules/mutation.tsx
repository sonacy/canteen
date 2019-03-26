import React from 'react'
import { Mutation } from 'react-apollo'
import { handleErrors } from '../utils/handleErrors'
import ApolloClient from 'apollo-client'

export const mutationHOC = <T, F>(mutation: any) => {
	const controller = ({
		children,
	}: {
		children: (data: {
			client: ApolloClient<Object>
			submit: (
				values: F
			) => Promise<{
				errors?: Array<{ [key: string]: string }>
				data?: any
			}>
		}) => JSX.Element | null
	}) => {
		return (
			<Mutation<T, F> mutation={mutation}>
				{(mutate, { client }) => {
					return children({
						client,
						submit: async values => {
							try {
								const data = await mutate({
									variables: values,
								})
								return {
									data,
								}
							} catch (e) {
								const errors = handleErrors(e)
								return { errors }
							}
						},
					})
				}}
			</Mutation>
		)
	}

	return controller
}
