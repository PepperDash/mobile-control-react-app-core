import { useNavigate } from "react-router-dom";

export const ErrorBox = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <div className="m-2 p-2 bg-danger rounded d-flex align-items-center">
        <span className="fs-5 text-white">
          We are sorry. Something went wrong.
        </span>
      </div>
      <button className="btn btn-primary p-2" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};
