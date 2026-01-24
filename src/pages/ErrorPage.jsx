import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-200">
      
      {/* ERROR IMAGE */}
      <img
        src="https://i.ibb.co/Xr7yq0Z2/404-connection-error-the-assistants-checks-the-situation-sorry-page-not-found-vector.jpg"
        alt="404 Error"
        className="w-72 md:w-96 mb-6"
      />

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
        Oops! Page Not Found
      </h1>

      {/* MESSAGE */}
      <p className="text-gray-600 mb-6 max-w-md">
        {error?.statusText ||
          error?.message ||
          "The page you are looking for doesn’t exist or something went wrong."}
      </p>

      {/* BACK BUTTON */}
      <Link
        to="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
