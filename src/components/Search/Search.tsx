import "./Search.scss";

import Icon from "@components/Icon/Icon";
import { DEBOUNCE_DELAY } from "@constants/constants";
import { useAppSelector } from "@src/withTypes";
import { selectSearchString } from "@store/selectors";
import { searchClear, updateSearchString } from "@store/slices/artworksSlice";
import { searchArtworks } from "@store/thunks";
import debounce from "lodash.debounce";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const SEARCH_ICON_NAME = "search.svg";

function Search() {
  const searchString = useAppSelector(selectSearchString);
  const dispatch = useDispatch();
  const [value, setValue] = useState(searchString);

  useEffect(() => {
    dispatch(updateSearchString({ value }));
    if (value === "") {
      dispatch(searchClear());
      return;
    }
    handleSearchDebounced(value);
  }, [value]);

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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <div className="input-wrapper">
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

export default Search;
