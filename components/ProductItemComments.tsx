const ProductItemComments = ({ hitProps }) => (
  <div
    style={{
      display: "grid",
      gridAutoFlow: "column",
      justifyContent: "start",
      alignItems: "center",
      gap: 4
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "relative",
        top: "1px"
      }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <span>{hitProps.comments.toLocaleString()}</span>
  </div>
);

export default ProductItemComments;
