import gql from 'graphql-tag'
import { mutationHOC } from './mutation'
import { LoginMutation, LoginMutationVariables } from '../types/LoginMutation'

const loginMutation = gql`
	mutation LoginMutation($name: String!, $password: String!) {
		login(name: $name, password: $password) {
			email
			name
		}
	}
`

export const LoginController = mutationHOC<
	LoginMutation,
	LoginMutationVariables
>(loginMutation)
