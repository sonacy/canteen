/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageShopQuery
// ====================================================

export interface PageShopQuery_cursorShop_data {
  __typename: "Shop";
  name: string;
  pics: string[] | null;
  id: string;
  address: string | null;
  phone: string | null;
}

export interface PageShopQuery_cursorShop {
  __typename: "ShopPagination";
  data: PageShopQuery_cursorShop_data[];
  hasMore: boolean;
}

export interface PageShopQuery {
  cursorShop: PageShopQuery_cursorShop;
}

export interface PageShopQueryVariables {
  size: number;
  cursor?: string | null;
}
