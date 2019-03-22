/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  __typename: "User";
  name: string;
  email: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register;
}

export interface RegisterMutationVariables {
  data: RegisterInput;
}
