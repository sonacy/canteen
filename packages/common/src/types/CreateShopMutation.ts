/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateShopMutation
// ====================================================

export interface CreateShopMutation_createShop {
  __typename: "Shop";
  id: string;
}

export interface CreateShopMutation {
  createShop: CreateShopMutation_createShop;
}

export interface CreateShopMutationVariables {
  name: string;
  address?: string | null;
  phone?: string | null;
  pics: any[];
}
