import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Home.scss";

// @ts-ignore
import searchIcon from "../../assets/search.svg";
import { useAppDispatch, useAppSelector } from "../../withTypes";
import { selectArtworks } from "../../store/selectors";
import { fetchArtworks } from "../../store/thunks";
import ArtworkCard from "../../components/SpecialGallery/ArtworkCard";
import SpecialGallery from "../../components/SpecialGallery/SpecialGallery";

function Home() {
  const dispatch = useAppDispatch();
  const artworks = useAppSelector(selectArtworks);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, []);

  console.log({ artworks });

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

          {/*  Our special gallery*/}
          <SpecialGallery />
        </div>
      </div>
    </div>
  );
}

export default Home;
