import React, { useEffect, useMemo, useState } from "react";
import "./Search.scss";
// @ts-ignore
import searchIcon from "../../assets/search.svg";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { searchArtworks } from "../../store/thunks";
import { searchClear } from "../../store/slices/artworksSlice";
import { DEBOUNCE_DELAY } from "../../utils/constants";

function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (value === "") {
      dispatch(searchClear());
      return;
    }
    handleSearchDebounced(value);
  }, [value]);

  useEffect(() => {
    return () => {
      dispatch(searchClear());
    };
  }, []);

  const handleSearchDebounced = useMemo(
    () => debounce(handleSearch, DEBOUNCE_DELAY),
    [],
  );
  useEffect(() => {
    return () => handleSearchDebounced.cancel();
  }, [handleSearchDebounced]);

  function handleSearch(value: string) {
    // @ts-ignore
    if (value !== "") dispatch(searchArtworks(value));
  }

  return (
    <div className="input-wrapper">
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={"Search art, artist, work..."}
      />
      <img src={searchIcon} alt="Search icon" className={"input-icon"} />
    </div>
  );
}

export default Search;
