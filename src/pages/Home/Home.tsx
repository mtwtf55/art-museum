import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";

// @ts-ignore
import searchIcon from "../../assets/search.svg";
import { useAppDispatch, useAppSelector } from "../../withTypes";
import {
  selectRandomArtWorks,
  selectRandomArtworksIIIFUrl,
  selectSearchArtworksLength,
} from "../../store/selectors";
import { fetchArtworks, fetchRandomArtworks } from "../../store/thunks";
import SpecialGallery from "../../components/SpecialGallery/SpecialGallery";
import OtherWorks from "../../components/OtherWorks/OtherWorks";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import SearchResults from "../../components/Search/SearchResults";

function Home() {
  const dispatch = useAppDispatch();
  const randomArtworks = useAppSelector(selectRandomArtWorks);
  const randomArtworksIIIFUrl = useAppSelector(selectRandomArtworksIIIFUrl);
  const searchArtworksLength = useAppSelector(selectSearchArtworksLength);

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
                <SpecialGallery />
              </div>
              <div className="main__other-works">
                <OtherWorks
                  artworks={randomArtworks}
                  iiifUrl={randomArtworksIIIFUrl}
                />
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
