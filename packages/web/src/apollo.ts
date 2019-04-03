import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

export const client = new ApolloClient({
	link: createUploadLink({
		uri: process.env.REACT_APP_SERVER_URL,
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})
