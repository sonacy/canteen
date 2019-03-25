/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageShopQuery
// ====================================================

export interface PageShopQuery_pageShop {
  __typename: "Shop";
  name: string;
  pics: string[] | null;
  id: string;
  address: string | null;
  phone: string | null;
}

export interface PageShopQuery {
  pageShop: PageShopQuery_pageShop[];
}

export interface PageShopQueryVariables {
  pageSize: number;
  pageNo: number;
}
