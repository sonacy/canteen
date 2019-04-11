import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { OperationDefinitionNode } from 'graphql'

const wsLink = new WebSocketLink({
	uri: `${process.env.REACT_APP_WS_URL}/graphql`,
	options: {
		reconnect: true,
	},
})

const httpLink = createUploadLink({
	uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
	credentials: 'include',
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(
			query
		) as OperationDefinitionNode

		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink
)

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})
