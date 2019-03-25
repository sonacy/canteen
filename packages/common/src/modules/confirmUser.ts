import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	ConfirmUserMutation,
	ConfirmUserMutationVariables,
} from 'src/types/ConfirmUserMutation'

const ConfirmUserMutation = gql`
	mutation ConfirmUserMutation($token: String!) {
		confirmUser(token: $token)
	}
`

export const ConfirmUserController = mutationHOC<
	ConfirmUserMutation,
	ConfirmUserMutationVariables
>(ConfirmUserMutation)
