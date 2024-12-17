import "./Favourites.scss";

import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import ArtworkCardSmall from "@components/OtherWorks/ArtworkCardSmall/ArtworkCardSmall";
import Spinner from "@components/Spinner/Spinner";
import { Artwork } from "@src/types/types";
import { useAppDispatch, useAppSelector } from "@src/withTypes";
import {
  selectFavouriteArtworks,
  selectFavouriteArtworksIIIFUrl,
  selectFavouritesAreLoading,
} from "@store/selectors";
import { fetchArtworksByIds } from "@store/thunks";
import React, { useEffect } from "react";

function Favourites() {
  const dispatch = useAppDispatch();
  const favouriteArtworks = useAppSelector(selectFavouriteArtworks);
  const favouriteArtworksIIIFUrl = useAppSelector(
    selectFavouriteArtworksIIIFUrl,
  );
  const areLoading = useAppSelector(selectFavouritesAreLoading);

  useEffect(() => {
    const validIds = Object.keys(sessionStorage).filter(
      (k) => !isNaN(Number(k)),
    );
    if (validIds.length === 0) return;
    dispatch(fetchArtworksByIds(validIds));
  }, []);

  function createArtworkCard(a: Artwork) {
    return (
      <ArtworkCardSmall
        artwork={a}
        key={a.id}
        iiifUrl={favouriteArtworksIIIFUrl}
      />
    );
  }

  const favouriteItems = favouriteArtworks.map(createArtworkCard);

  return (
    <div>
      <Header />
      <div className="favourites-wrapper">
        <div className={"favourites"}>
          <FavouritesTitle />
          <div className="favourites__main">
            <div className="favourites__main__title">
              <p className="favourites__main__title__sub">Saved by you</p>
              <p className="favourites__main__title__main">
                Your favorites list
              </p>
            </div>
            {areLoading ? (
              <div className="favourites__main__spinner-wrapper">
                <Spinner />
              </div>
            ) : (
              <div className="favourites__main__list">{favouriteItems}</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FavouritesTitle() {
  return (
    <p className="favourites__title">
      Here Are Your
      <br />
      <span className="favourites__title__sub">
        <svg
          width="38"
          height="49"
          viewBox="0 0 38 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.2573 45.9032L18.9993 36.4409L2.74121 45.9032V8.05375C2.74121 6.79897 3.23061 5.59557 4.10175 4.7083C4.97288 3.82103 6.1544 3.32257 7.38637 3.32257H30.6122C31.8442 3.32257 33.0257 3.82103 33.8968 4.7083C34.7679 5.59557 35.2573 6.79897 35.2573 8.05375V45.9032Z"
            stroke="#F17900"
            strokeWidth="4.69765"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>{" "}
        Favourites
      </span>
    </p>
  );
}

export default Favourites;
