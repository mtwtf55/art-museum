import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";

import { useAppDispatch, useAppSelector } from "../../withTypes";
import {
  selectArtworks,
  selectArtworksAreLoading,
  selectRandomArtworks,
  selectRandomArtworksAreLoading,
  selectRandomArtworksIIIFUrl,
  selectSearchArtworksLength,
} from "../../store/selectors";
import { fetchArtworks, fetchRandomArtworks } from "../../store/thunks";
import SpecialGallery from "../../components/SpecialGallery/SpecialGallery";
import OtherWorks from "../../components/OtherWorks/OtherWorks";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import SearchResults from "../../components/Search/SearchResults";
import Spinner from "../../components/Spinner/Spinner";

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
      {/*  Main body*/}
      <div className="main">
        <div className="container">
          {/*Title of main*/}
          <p className="main__title">
            Let&#39;s Find Some{" "}
            <span className={"main__title__inner"}>Art</span>
            <br /> Here!
          </p>

          <Search />
          {searchArtworksLength !== 0 ? (
            <SearchResults />
          ) : (
            <>
              <div className="main__special-gallery">
                {areArtworksLoading ? (
                  <Spinner />
                ) : (
                  <SpecialGallery artworks={artworks} />
                )}
              </div>
              <div className="main__other-works">
                {areRandomArtworksLoading ? (
                  <Spinner />
                ) : (
                  <OtherWorks
                    artworks={randomArtworks}
                    iiifUrl={randomArtworksIIIFUrl}
                  />
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
