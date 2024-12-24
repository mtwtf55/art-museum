import "./Image.scss";

import Spinner from "@Components/Spinner/Spinner";
import { DEFAULT_IMG_PATH_PAYLOAD } from "@Constants/constants";
import React, { SyntheticEvent, useMemo, useState } from "react";

type ImageProps = {
  iiifUrl: string;
  imageId: string | undefined | null;
};

const LOADING_LIMIT_MS = 5000;
const ERROR_MESSAGE = "Could not load the image.";

function Image({ iiifUrl, imageId }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadingTimer = useMemo(
    () => setTimeout(handleImageLoadExpires, LOADING_LIMIT_MS),
    [],
  );
  const imageUrl = useMemo(
    () => `${iiifUrl}/${imageId}${DEFAULT_IMG_PATH_PAYLOAD}`,
    [iiifUrl, imageId],
  );

  function handleImageLoadExpires() {
    setIsLoading(false);
    setIsError(true);
  }

  function handleImageLoaded(event: SyntheticEvent<HTMLImageElement>) {
    setIsLoading(false);
    clearTimeout(loadingTimer);

    if (isError) setIsError(false);

    event.currentTarget.style.visibility = "visible";
  }

  const ErrorMessage = <p className="image__error-message">{ERROR_MESSAGE}</p>;

  return (
    <div className="image">
      {isLoading && (
        <div className="image__spinner">
          <Spinner />
        </div>
      )}
      {isError && ErrorMessage}
      <img
        src={imageUrl}
        alt=""
        onLoad={handleImageLoaded}
        className="image__main"
      />
    </div>
  );
}

export default Image;
