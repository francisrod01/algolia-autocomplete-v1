/** @jsx h */
import {
  AutocompletePlugin,
  getAlgoliaResults
} from "@algolia/autocomplete-js";
import { SearchClient } from "algoliasearch/lite";
import { h, Fragment } from "preact";
import { ProductHit, ProductRecord } from "./types";

// https://raw.githubusercontent.com/algolia/datasets/master/ecommerce/records.json

type CreateProductsPluginProps = {
  searchClient: SearchClient;
  recentSearchesPlugin: any;
};

export function createEcommercePlugin({
  searchClient,
  recentSearchesPlugin
}: CreateProductsPluginProps): AutocompletePlugin<ProductHit, undefined> {
  return {
    getSources({ query, state }) {
      if (!query) {
        return [];
      }

      return [
        {
          sourceId: "productsPlugin",
          getItems() {}
        }
      ];
    }
  };
}
