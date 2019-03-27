import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	ConfirmUserMutation,
	ConfirmUserMutationVariables,
} from '../types/ConfirmUserMutation'

export const confirmUserMutation = gql`
	mutation ConfirmUserMutation($token: String!) {
		confirmUser(token: $token)
	}
`

export const ConfirmUserController = mutationHOC<
	ConfirmUserMutation,
	ConfirmUserMutationVariables
>(confirmUserMutation)
