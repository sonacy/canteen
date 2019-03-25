/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordMutation
// ====================================================

export interface ChangePasswordMutation_changePassword {
  __typename: "User";
  name: string;
}

export interface ChangePasswordMutation {
  changePassword: ChangePasswordMutation_changePassword;
}

export interface ChangePasswordMutationVariables {
  token: string;
  newPassword: string;
}
