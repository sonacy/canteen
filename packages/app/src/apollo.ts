import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { Platform } from 'react-native'

const host =
	Platform.OS === 'ios'
		? 'http://localhost:4000/graphql'
		: 'http://30.22.108.13:4000/graphql'

export const client = new ApolloClient({
	link: createUploadLink({
		uri: host,
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})
