import { AutocompleteComponents } from "@algolia/autocomplete-js";
import { AutocompleteInsightsApi } from "@algolia/autocomplete-plugin-algolia-insights";
import { ProductHit } from "../types";

// import ButtonFillQuery from "./ButtonFillQuery";

type ProductItemProps = {
  hit: ProductHit;
  insights: AutocompleteInsightsApi;
  components: AutocompleteComponents;
};

const ProductItem = ({ hit, insights, components }: ProductItemProps) => (
  // <div className="aa-ItemLink">
  <a href={hit.url} className="aa-ItemLink">
    <div className="aa-ItemContent">
      {/* <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop"> */}
      <div className="aa-ItemIcon">
        <img src={hit.image} alt={hit.name} width="40" height="40" />
      </div>

      <div className="aa-ItemContentBody">
        <div className="aa-ItemContentTitle">
          {/* <components.Snippet hit={hit} attribute="name" /> */}
          <components.Highlight hit={hit} attribute="name" />
        </div>

        <div className="aa-ItemContentDescription">
          By <strong>{hit.brand}</strong> in{" "}
          <strong>{hit.categories[0]}</strong>
        </div>

        {/* <ButtonFillQuery hitProps={hit} /> */}
      </div>
    </div>
  </a>
  // {/* </div> */}
);

export default ProductItem;
