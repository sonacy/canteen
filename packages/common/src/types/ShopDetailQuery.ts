/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopDetailQuery
// ====================================================

export interface ShopDetailQuery_detailShop_foods {
  __typename: "Food";
  id: string;
  name: string;
  price: number;
  calories: number;
  pics: string[];
}

export interface ShopDetailQuery_detailShop {
  __typename: "Shop";
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  pics: string[] | null;
  foods: ShopDetailQuery_detailShop_foods[] | null;
}

export interface ShopDetailQuery {
  detailShop: ShopDetailQuery_detailShop;
}

export interface ShopDetailQueryVariables {
  id: string;
}
