import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";

// @ts-ignore
import searchIcon from "../../assets/search.svg";
import { useAppDispatch, useAppSelector } from "../../withTypes";
import { selectArtworks, selectRandomArtWorks } from "../../store/selectors";
import { fetchArtworks, fetchRandomArtworks } from "../../store/thunks";
import SpecialGallery from "../../components/SpecialGallery/SpecialGallery";
import OtherWorks from "../../components/OtherWorks/OtherWorks";
import Footer from "../../components/Footer/Footer";

function Home() {
  const dispatch = useAppDispatch();
  const artworks = useAppSelector(selectArtworks);
  const randomArtworks = useAppSelector(selectRandomArtWorks);

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

          {/* Search field*/}
          <div className="input-wrapper">
            <input
              type="text"
              className="input"
              placeholder={"Search art, artist, work..."}
            />
            <img src={searchIcon} alt="Search icon" className={"input-icon"} />
          </div>

          <div className="main__special-gallery">
            <SpecialGallery />
          </div>
          <div className="main__other-works">
            <OtherWorks artworks={randomArtworks} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
