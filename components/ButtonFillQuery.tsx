const ButtonFillQuery = ({ hitProps }) => (
  <button
    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
    type="button"
    title={`Fill query with "${hitProps.query}"`}
    disabled={true}
    style={{
      pointerEvents: "none"
    }}
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      // onTapAhead(hit);
    }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
    </svg>
  </button>
);

export default ButtonFillQuery;
