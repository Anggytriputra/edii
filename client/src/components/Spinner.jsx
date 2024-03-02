import SpinnerBoot from "react-bootstrap/Spinner";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SpinnerBoot
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </SpinnerBoot>
    </div>
  );
}

export default Spinner;
