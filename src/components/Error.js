const Error = () => {
  return (
    <div className="error-page">
      <div className="error-heading">We'll be back shortly</div>
      <p className="error-message">
        We are fixing a temporary glitch. Sorry for the inconvenience.
      </p>
      <button className="go-back-btn" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default Error;
