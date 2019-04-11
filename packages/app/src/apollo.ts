import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'https://sonacy-canteen.herokuapp.com/graphql',
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})
