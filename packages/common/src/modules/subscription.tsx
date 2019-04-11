import React from 'react'
import { Subscription } from 'react-apollo'
import { ApolloError } from 'apollo-client'

export const subscriptionHOC = <T, F>(subscription: any) => {
	return ({
		children,
	}: {
		children: ({
			data,
			loading,
			error,
		}: {
			data: T | undefined
			loading: boolean
			error: ApolloError | undefined
		}) => JSX.Element | null
	}) => {
		return (
			<Subscription<T, F> subscription={subscription}>
				{({ data, loading, error }) => children({ data, loading, error })}
			</Subscription>
		)
	}
}
