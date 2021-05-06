/** @jsx h */
import { autocomplete } from "@algolia/autocomplete-js";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createAlgoliaInsightsPlugin } from "@algolia/autocomplete-plugin-algolia-insights";

import algoliasearch from "algoliasearch/lite";
import insightsClient from "search-insights";
import { h, Fragment, render } from "preact";

// import { createBrandsPlugin } from "./brandsPlugin";
import { createProductsPlugin } from "./productsPlugin";
import { createCategoriesPlugin } from "./categoriesPlugin";

import ProductItemComments from "./components/ProductItemComments";
import ProductItemPrice from "./components/ProductItemPrice";
import ProductItemRating from "./components/ProductItemRating";

import { ProductHit } from "./types";

import "@algolia/autocomplete-theme-classic";

const appId = "latency";
const apiKey = "6be0576ff61c053d5f9a3225e2a90f76";
const searchClient = algoliasearch(appId, apiKey);

// @ts-expect-error type error in search-insights
insightsClient("init", { appId, apiKey });

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({
  insightsClient,
  onItemsChange({ insights, insightsEvents }) {
    const events = insightsEvents.map((insightsEvent) => ({
      ...insightsEvent,
      eventName: "Product Viewed from Autocomplete"
    }));
    insights.viewedObjectIDs(...events);
  },
  onSelect({ insights, insightsEvents }) {
    const events = insightsEvents.map((insightsEvent) => ({
      ...insightsEvent,
      eventName: "Product Selected from Autocomplete"
    }));
    insights.clickedObjectIDsAfterSearch(...events);
  }
});

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "RECENT_SEARCH",
  limit: 3,
  transformSource({ source }) {
    return {
      ...source,
      templates: {
        ...source.templates,
        header({ items, state }) {
          if (Boolean(state.query) || items.length === 0) {
            return null;
          }

          return (
            <Fragment>
              <span className="aa-SourceHeaderTitle">Your searches</span>
              <div className="aa-SourceHeaderLine" />
            </Fragment>
          );
        }
      }
    };
  }
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "instant_search_demo_query_suggestions",
  getSearchParams({ state }) {
    return recentSearchesPlugin.data.getAlgoliaSearchParams({
      clickAnalytics: true,
      // hitsPerPage: state.query ? 5 : 10
      hitsPerPage: 4
    });
  },
  categoryAttribute: [
    "instant_search",
    "facets",
    "exact_matches",
    "categories"
  ],
  categoriesPerItem: 2,
  transformSource({ source }) {
    return {
      ...source,
      sourceId: "suggestions",
      onSelect({ item, setQuery, setIsOpen, refresh }) {
        setQuery(`${item.query} `);
        setIsOpen(true);
        refresh();
      },
      templates: {
        ...source.templates,
        header({ items, Fragment, state }) {
          if (Boolean(state.query) || items.length === 0) {
            return null;
          }

          return (
            <Fragment>
              <span className="aa-SourceHeaderTitle">
                Can't find what you're looking for?
              </span>
              <div className="aa-SourceHeaderLine" />
            </Fragment>
          );
        },
        item({ item, components }) {
          return (
            <div className="aa-QuerySuggestion">
              <components.ReverseHighlight hit={item} attribute="query" />
            </div>
          );
        }
      }
    };
  }
});

const productsPlugin = createProductsPlugin({
  searchClient,
  recentSearchesPlugin
});

const categoriesPlugin = createCategoriesPlugin({
  searchClient,
  attribute: "categories"
});

const pluginsDefinitions: any = {
  plugins: [
    algoliaInsightsPlugin,
    recentSearchesPlugin,
    productsPlugin,
    querySuggestionsPlugin,
    categoriesPlugin
  ]
};

autocomplete<ProductHit>({
  container: "#autocomplete",
  placeholder: "Search for things",
  debug: process.env.NODE_ENV === "development",
  openOnFocus: true,
  defaultActiveItemId: 0,
  // detachedMediaQuery: "(max-width: 480px)",
  detachedMediaQuery: "",
  ...pluginsDefinitions,
  render({ children, state, Fragment, components }, root) {
    const { preview, algoliaInsightsPlugin } = state.context;

    render(
      <Fragment>
        <div className="aa-Grid">
          <div className="aa-Results aa-Column">{children}</div>

          {!!preview && (
            <div className="aa-Preview aa-Column">
              <div className="aa-PreviewImage">
                <img src={preview.image} alt={preview.name} />
              </div>
              <div className="aa-PreviewTitle">
                <components.Highlight hit={preview} attribute="name" />
              </div>

              <div className="aa-ItemContentDescription">
                By <strong>{preview.brand}</strong> in{" "}
                <strong>{preview.categories[0]}</strong>
              </div>

              <div
                className="aa-ItemContentDescription"
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 8
                }}
              >
                {preview.rating > 0 && <ProductItemRating hitProps={preview} />}
                <ProductItemComments hitProps={preview} />
              </div>

              <ProductItemPrice
                hitProps={preview}
                insightProps={algoliaInsightsPlugin.insights}
              />

              <div className="aa-PreviewDescription">
                <components.Highlight
                  hit={preview}
                  attribute={["description"]}
                />
              </div>
            </div>
          )}
        </div>
      </Fragment>,
      root
    );
  }
});
