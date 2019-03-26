/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateShopMutation
// ====================================================

export interface UpdateShopMutation_updateShop {
  __typename: "Shop";
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  pics: string[] | null;
}

export interface UpdateShopMutation {
  updateShop: UpdateShopMutation_updateShop;
}

export interface UpdateShopMutationVariables {
  id: string;
  name: string;
  address: string;
  phone: string;
  pics?: any[] | null;
}
