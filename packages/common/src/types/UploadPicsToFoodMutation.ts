/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadPicsToFoodMutation
// ====================================================

export interface UploadPicsToFoodMutation_uploadPicsToFood {
  __typename: "Food";
  id: string;
  pics: string[];
}

export interface UploadPicsToFoodMutation {
  uploadPicsToFood: UploadPicsToFoodMutation_uploadPicsToFood;
}

export interface UploadPicsToFoodMutationVariables {
  id: string;
  pics: any[];
}
