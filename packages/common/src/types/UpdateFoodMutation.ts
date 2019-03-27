/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateFoodMutation
// ====================================================

export interface UpdateFoodMutation_updateFood_shop {
  __typename: "Shop";
  id: string;
}

export interface UpdateFoodMutation_updateFood {
  __typename: "Food";
  id: string;
  name: string;
  price: number;
  calories: number;
  pics: string[];
  shop: UpdateFoodMutation_updateFood_shop | null;
}

export interface UpdateFoodMutation {
  updateFood: UpdateFoodMutation_updateFood;
}

export interface UpdateFoodMutationVariables {
  id: string;
  name: string;
  price: number;
  calories: number;
}
