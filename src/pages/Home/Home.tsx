import "./Home.scss";

import ErrorBoundaryFallback from "@components/ErrorBoundaryFallback/ErrorBoundaryFallback";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import OtherWorks from "@components/OtherWorks/OtherWorks";
import Search from "@components/Search/Search";
import SearchResults from "@components/Search/SearchResults";
import SpecialGallery from "@components/SpecialGallery/SpecialGallery";
import Spinner from "@components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "@src/withTypes";
import {
  selectArtworks,
  selectArtworksAreLoading,
  selectRandomArtworks,
  selectRandomArtworksAreLoading,
  selectRandomArtworksIIIFUrl,
  selectSearchArtworksLength,
} from "@store/selectors";
import { fetchArtworks, fetchRandomArtworks } from "@store/thunks";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Home() {
  const dispatch = useAppDispatch();
  const randomArtworks = useAppSelector(selectRandomArtworks);
  const artworks = useAppSelector(selectArtworks);
  const randomArtworksIIIFUrl = useAppSelector(selectRandomArtworksIIIFUrl);
  const searchArtworksLength = useAppSelector(selectSearchArtworksLength);
  const areArtworksLoading = useAppSelector(selectArtworksAreLoading);
  const areRandomArtworksLoading = useAppSelector(
    selectRandomArtworksAreLoading,
  );

  useEffect(() => {
    dispatch(fetchArtworks());
    dispatch(fetchRandomArtworks(12));
  }, []);

  return (
    <div>
      <Header />
      <div className="main">
        <div className="container">
          <p className="main__title">
            Let&#39;s Find Some{" "}
            <span className={"main__title__inner"}>Art</span>
            <br /> Here!
          </p>

          <Search />

          {searchArtworksLength !== 0 ? (
            <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
              <SearchResults />
            </ErrorBoundary>
          ) : (
            <>
              <div className="main__special-gallery">
                {areArtworksLoading ? (
                  <Spinner />
                ) : (
                  <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
                    <SpecialGallery artworks={artworks} />
                  </ErrorBoundary>
                )}
              </div>
              <div className="main__other-works">
                {areRandomArtworksLoading ? (
                  <Spinner />
                ) : (
                  <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
                    <OtherWorks
                      artworks={randomArtworks}
                      iiifUrl={randomArtworksIIIFUrl}
                    />
                  </ErrorBoundary>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
