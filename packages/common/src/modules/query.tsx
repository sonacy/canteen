import React from 'react'
import { Query } from 'react-apollo'
import {
	ApolloError,
	ApolloQueryResult,
	FetchMoreQueryOptions,
	FetchMoreOptions,
} from 'apollo-client'

export const queryHOC = <T, F>(query: any) => {
	return ({
		children,
		variables,
		onAuthError,
	}: {
		onAuthError?: () => void
		variables: any
		children: ({
			data,
			loading,
			error,
			fetchMore,
		}: {
			data: T | undefined
			loading: boolean
			error: ApolloError | undefined
			fetchMore: <K extends keyof F>(
				fetchMoreOptions: FetchMoreQueryOptions<F, K> & FetchMoreOptions<T, F>
			) => Promise<ApolloQueryResult<T>>
		}) => JSX.Element | null
	}) => {
		return (
			<Query<T, F>
				query={query}
				variables={variables}
				onError={error => {
					if (error.message.includes('Access denied!')) {
						if (typeof onAuthError === 'function') {
							onAuthError()
						}
					}
				}}>
				{({ data, loading, error, fetchMore }) =>
					children({ data, loading, error, fetchMore })
				}
			</Query>
		)
	}
}
