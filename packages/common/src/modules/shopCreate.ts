import { mutationHOC } from './mutation'
import gql from 'graphql-tag'
import {
  CreateShopMutation,
  CreateShopMutationVariables,
} from '../types/CreateShopMutation'

export const shopCreateMutation = gql`
  mutation CreateShopMutation(
    $name: String!
    $address: String
    $phone: String
    $pics: [Upload!]!
  ) {
    createShop(name: $name, address: $address, phone: $phone, pics: $pics) {
      id
      name
      address
      phone
      pics
    }
  }
`

export const ShopCreateController = mutationHOC<
  CreateShopMutation,
  CreateShopMutationVariables
>(shopCreateMutation)
