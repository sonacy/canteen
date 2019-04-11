/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ShopAddedSubscription
// ====================================================

export interface ShopAddedSubscription_shopAdded {
  __typename: "Shop";
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  pics: string[] | null;
}

export interface ShopAddedSubscription {
  shopAdded: ShopAddedSubscription_shopAdded;
}
