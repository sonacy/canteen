/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateFoodMutation
// ====================================================

export interface CreateFoodMutation_createFood_shop {
  __typename: "Shop";
  id: string;
}

export interface CreateFoodMutation_createFood {
  __typename: "Food";
  id: string;
  name: string;
  price: number;
  calories: number;
  pics: string[];
  shop: CreateFoodMutation_createFood_shop | null;
}

export interface CreateFoodMutation {
  createFood: CreateFoodMutation_createFood;
}

export interface CreateFoodMutationVariables {
  name: string;
  price: number;
  calories: number;
  pics: any[];
  shopId: string;
}
