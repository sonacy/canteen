import gql from 'graphql-tag'
import {
	RegisterMutationVariables,
	RegisterMutation,
} from '../types/RegisterMutation'
import { mutationHOC } from './mutation'

const registerMutation = gql`
	mutation RegisterMutation($data: RegisterInput!) {
		register(data: $data) {
			name
			email
		}
	}
`

export const RegisterController = mutationHOC<
	RegisterMutation,
	RegisterMutationVariables
>(registerMutation)
