import ButtonCartInsights from "./ButtonCartInsights";

const ProductItemPrice = ({ hitProps, insightProps }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8
    }}
  >
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: 4
      }}
    >
      <div>
        <span
          style={{
            color: "#000",
            fontSize: "0.9em",
            fontWeight: "bold"
          }}
        >
          ${hitProps.sale_price.toLocaleString()}
        </span>{" "}
        {hitProps.sale && (
          <span
            style={{
              color: "rgb(var(--aa-muted-color-rgb))",
              fontSize: "0.9em",
              textDecoration: "line-through"
            }}
          >
            ${hitProps.price.toLocaleString()}
          </span>
        )}
      </div>

      {hitProps.sale && (
        <span
          style={{
            textTransform: "uppercase",
            fontSize: "0.64em",
            background: "#539753",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 9999,
            padding: "2px 6px",
            display: "inline-block",
            lineHeight: "1.25em"
          }}
        >
          On sale
        </span>
      )}

      <ButtonCartInsights hitProps={hitProps} insightProps={insightProps} />
    </div>
  </div>
);

export default ProductItemPrice;
