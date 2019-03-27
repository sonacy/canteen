/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadPicsToShopMutation
// ====================================================

export interface UploadPicsToShopMutation_updatePicsToShop {
  __typename: "Shop";
  id: string;
  pics: string[] | null;
}

export interface UploadPicsToShopMutation {
  updatePicsToShop: UploadPicsToShopMutation_updatePicsToShop;
}

export interface UploadPicsToShopMutationVariables {
  id: string;
  pics: any[];
}
