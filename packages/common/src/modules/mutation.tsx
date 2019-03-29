import React from 'react'
import { Mutation } from 'react-apollo'
import { handleErrors } from '../utils/handleErrors'
import ApolloClient, {
	PureQueryOptions,
	MutationUpdaterFn,
} from 'apollo-client'

export const mutationHOC = <T, F>(mutation: any) => {
	const controller = ({
		children,
		refetchQueries,
		update,
	}: {
		refetchQueries?: Array<string | PureQueryOptions>
		update?: MutationUpdaterFn<T>
		children: (data: {
			loading?: boolean
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
				{(mutate, { client, loading }) => {
					return children({
						loading,
						client,
						submit: async values => {
							try {
								const data = await mutate({
									variables: values,
									refetchQueries,
									update,
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
