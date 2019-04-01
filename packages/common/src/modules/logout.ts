import gql from 'graphql-tag'
import { mutationHOC } from './mutation'
import { LogoutMutation } from '../types/LogoutMutation'

export const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`

export const LogoutController = mutationHOC<LogoutMutation, {}>(logoutMutation)
