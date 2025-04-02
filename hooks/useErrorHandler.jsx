import { useState } from "react";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { AxiosError } from "axios";

const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState();

  const errorHandler = (err, setError) => {
    const errors = err?.response?.data?.errors;

    if (err?.message === "Network Error") {
      setErrorMessage(
        "Unable to connect to the server. \n\nPlease ensure you are connected to the BRHMC network or contact the system administrator for assistance."
      );
      return;
    }

    // Set a general error message if specific field errors are not available
    if (!errors) {
      setErrorMessage(
        "An unexpected error occurred. Please try again. or contact your system administrator"
      );
      return;
    }

    // Display specific field errors using form methods

    Object.keys(errors).forEach((key) => {
      const messages = errors[key]; // messages is an array of strings
      const errorMessage = messages.join(", ") || "Invalid input";
      setError(key, {
        type: "custom",
        message: errorMessage,
      });
    });

    // Optionally, set a general error message based on field errors
    // setErrorMessage('Please check the highlighted fields.');
  };

  return { errorMessage, setErrorMessage, errorHandler };
};

export default useErrorHandler;
