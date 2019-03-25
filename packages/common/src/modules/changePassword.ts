import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	ChangePasswordMutation,
	ChangePasswordMutationVariables,
} from 'src/types/ChangePasswordMutation'

const ChangePasswordMutation = gql`
	mutation ChangePasswordMutation($token: String!, $newPassword: String!) {
		changePassword(token: $token, newPassword: $newPassword) {
			name
		}
	}
`

export const ChangePasswordController = mutationHOC<
	ChangePasswordMutation,
	ChangePasswordMutationVariables
>(ChangePasswordMutation)
