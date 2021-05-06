/** @jsx h */
import {
  AutocompletePlugin,
  getAlgoliaResults
} from "@algolia/autocomplete-js";
import { SearchClient } from "algoliasearch/lite";
import { h, Fragment } from "preact";
import { ProductHit, ProductRecord } from "./types";

import ProductItem from "./components/ProductItem";

type CreateProductsPluginProps = {
  searchClient: SearchClient;
  recentSearchesPlugin: any;
};

export function createProductsPlugin({
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
          getItems() {
            return getAlgoliaResults<ProductRecord>({
              searchClient,
              queries: [
                {
                  indexName: "instant_search",
                  query,
                  params: {
                    clickAnalytics: true,
                    hitsPerPage: 5,
                    attributesToSnippet: ["name:10", "description:35"]
                    // snippetEllipsisText: "…"
                  }
                }
              ],
              transformResponse({ hits }) {
                const [bestBuyHits] = hits;

                return bestBuyHits.map((hit) => ({
                  ...hit,
                  comments: hit.popularity % 100,
                  sale: hit.free_shipping,
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  sale_price: hit.free_shipping
                    ? (hit.price - hit.price / 10).toFixed(2)
                    : hit.price.toString()
                }));
              }
            });
          },
          // getItemInputValue({ item }) {
          //   return item.name;
          // },
          getItemUrl({ item }) {
            return item.url;
          },
          templates: {
            header() {
              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Products</span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
            item({ item, components }) {
              return (
                <ProductItem
                  hit={item}
                  components={components}
                  insights={state.context.algoliaInsightsPlugin.insights}
                />
              );
            },
            noResults() {
              return (
                <div className="aa-ItemContent">No products matching.</div>
              );
            }
          },
          onActive({ item, setContext }) {
            setContext({ preview: item });
          },
          onSelect({ item }) {
            recentSearchesPlugin.data.addItem({
              id: item.objectID,
              label: item.name,
              image: item.image,
              url: item.url
            });
          }
        }
      ];
    }
  };
}
