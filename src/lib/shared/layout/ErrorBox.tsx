import { useState } from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export const ErrorBox = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <div className="m-2 p-2 bg-danger rounded d-flex align-items-center">
        <span className="fs-5 text-white">
          We are sorry. Something went wrong.
        </span>
      </div>
      <button
        className="btn btn-primary p-2"
        onPointerDown={() => navigate(-1)}
      >
        Go Back
      </button>
      <button
        className="btn btn-primary p-2"
        onPointerDown={() => setShowError(!showError)}
      >
        {showError ? 'Hide error message' : 'Show error message'}
      </button>
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};
