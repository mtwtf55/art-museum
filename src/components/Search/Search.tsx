import "./Search.scss";

import Icon from "@components/Icon/Icon";
import { DEBOUNCE_DELAY } from "@constants/constants";
import { useAppSelector } from "@src/withTypes";
import { selectSearchString } from "@store/selectors";
import { searchClear, updateSearchString } from "@store/slices/artworksSlice";
import { searchArtworks } from "@store/thunks";
import { useDebounce } from "@utils/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { string, ValidationError } from "yup";

const SEARCH_ICON_NAME = "search.svg";

function Search() {
  const searchString = useAppSelector(selectSearchString);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(searchString); // raw value from input field
  const [validatedValue, setValidatedValue] = useState<string | undefined>(); // validated value after yup schema verification
  const [error, setError] = useState<string | null>(null); // represents errors after validation
  const handleSearchDebounced = useDebounce(handleSearch, DEBOUNCE_DELAY);

  const searchStringSchema = string().matches(
    /^[a-zA-Z0-9-\s]*$/,
    "Only hyphen and space allowed as special characters",
  );

  useEffect(() => {
    dispatch(updateSearchString({ value }));
    if (value === "") handleSearchIsEmpty();
    else validateInput(value);
  }, [value]);

  useEffect(() => {
    if (validatedValue) handleSearchDebounced(validatedValue);
  }, [validatedValue]);

  function handleSearchIsEmpty() {
    dispatch(searchClear());
    setError(null);
  }

  function handleSearch(value: string) {
    // @ts-ignore
    dispatch(searchArtworks(value));
  }

  function validateInput(str: string) {
    if (str.length === 0) return;

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
