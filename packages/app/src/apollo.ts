import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://30.22.108.11:4000/graphql',
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})
