import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables,
} from '../types/ForgotPasswordMutation'

export const forgetPasswordMutation = gql`
	mutation ForgotPasswordMutation($email: String!) {
		forgotPassword(email: $email)
	}
`

export const ForgetPasswordController = mutationHOC<
	ForgotPasswordMutation,
	ForgotPasswordMutationVariables
>(forgetPasswordMutation)
