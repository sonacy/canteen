import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables,
} from 'src/types/ForgotPasswordMutation'

const ForgetPasswordMutation = gql`
	mutation ForgotPasswordMutation($email: String!) {
		forgotPassword(email: $email)
	}
`

export const ForgetPasswordController = mutationHOC<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>(ForgetPasswordMutation)
