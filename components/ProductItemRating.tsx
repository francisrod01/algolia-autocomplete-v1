const ProductItemRating = ({ hitProps }) => (
  <div className="aa-ItemContentDescription">
    <div
      style={{
        color: "rgba(var(--aa-muted-color-rgb), 0.5)"
      }}
    >
      {Array.from({ length: 5 }, (_value, index) => {
        const isFilled = hitProps.rating >= index + 1;

        return (
          <svg
            key={index}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFilled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  </div>
);

export default ProductItemRating;
