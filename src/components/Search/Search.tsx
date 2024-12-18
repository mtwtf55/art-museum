import "./Search.scss";

import Icon from "@components/Icon/Icon";
import { DEBOUNCE_DELAY } from "@constants/constants";
import { useDebounce } from "@utils/hooks/useDebounce";
import React, { ChangeEvent, useEffect, useState } from "react";
import { string, ValidationError } from "yup";

const SEARCH_ICON_NAME = "search.svg";

type SearchType = {
  onSearch: (q: string) => void;
  initialValue?: string;
};

function Search({ onSearch: handleSearch, initialValue }: SearchType) {
  const [value, setValue] = useState<string>(initialValue || ""); // raw value from input field
  const [validatedValue, setValidatedValue] = useState<string | undefined>(); // validated value after yup schema verification
  const [error, setError] = useState<string | null>(null); // represents errors after validation
  const validateInputDebounced = useDebounce(validateInput, DEBOUNCE_DELAY);

  const searchStringSchema = string().matches(
    /^[a-zA-Z0-9-\s]*$/,
    "Only hyphen and space allowed as special characters",
  );

  useEffect(() => {
    validateInputDebounced(value);
  }, [value]);

  useEffect(() => {
    if (value === "") handleEmptyInput();
    handleSearch(validatedValue ?? "");
  }, [validatedValue]);

  function handleEmptyInput() {
    setError(null);
    setValidatedValue(undefined);
  }

  function validateInput(str: string) {
    function handleError(error: ValidationError) {
      setError(error.errors.join(","));
    }

    function handleFulfilled(value: string | undefined) {
      setValidatedValue(value);
      setError(null);
    }

    searchStringSchema.validate(str).then(handleFulfilled).catch(handleError);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <div className="input-wrapper">
      {error && <ValidationErrorField message={error} />}
      <input
        type="text"
        className="input"
        value={value}
        onChange={handleInputChange}
        placeholder={"Search art, artist, work..."}
      />
      <Icon imgName={SEARCH_ICON_NAME} isClickable={true} />
    </div>
  );
}

function ValidationErrorField({ message }: { message: string }) {
  return (
    <div
      style={{
        color: "red",
        position: "absolute",
        top: "-20px",
        left: "0px",
      }}
    >
      {message}
    </div>
  );
}

export default Search;
