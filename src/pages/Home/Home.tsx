import "./Home.scss";

import ErrorBoundaryFallback from "@components/ErrorBoundaryFallback/ErrorBoundaryFallback";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import OtherWorks from "@components/OtherWorks/OtherWorks";
import Search from "@components/Search/Search";
import SearchResults from "@components/Search/SearchResults";
import SpecialGallery from "@components/SpecialGallery/SpecialGallery";
import Spinner from "@components/Spinner/Spinner";
import { DEFAULT_IIIF_URL, REQUESTED_FIELDS } from "@constants/constants";
import { ArtworksResponseType } from "@src/types/types";
import { createRequestUrl } from "@utils/functions/createRequestUrl";
import { useQuery } from "@utils/hooks/useQuery";
import React, { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const RANDOM_SEED = 500;
const SEARCH_RESULT_LIMIT = 15;

function Home() {
  const [searchString, setSearchString] = useState<string>("");

  const searchReqUrl = useMemo(
    () =>
      createRequestUrl()
        .search(searchString)
        .fields(REQUESTED_FIELDS)
        .limit(SEARCH_RESULT_LIMIT)
        .build(),
    [searchString],
  );

  const { query: searchQuery, data: searchResults } =
    useQuery<ArtworksResponseType>({
      url: searchReqUrl,
    });

  const {
    query: getArtworks,
    data: artworks,
    loading: artworksLoading,
  } = useQuery<ArtworksResponseType>({
    url: createRequestUrl()
      .limit(12)
      .page(Math.round(Math.random() * RANDOM_SEED))
      .fields(REQUESTED_FIELDS)
      .build(),
  });

  const {
    query: getOtherArtworks,
    data: otherArtworks,
    loading: otherArtworksLoading,
  } = useQuery<ArtworksResponseType>({
    url: createRequestUrl()
      .limit(12)
      .page(Math.round(Math.random() * RANDOM_SEED))
      .fields(REQUESTED_FIELDS)
      .build(),
  });

  useEffect(() => {
    getArtworks();
    getOtherArtworks();
  }, []);

  useEffect(() => {
    if (searchString !== "") searchQuery();
  }, [searchQuery]);

  function handleSearch(str: string) {
    setSearchString(str);
  }

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

          <Search onSearch={handleSearch} initialValue={searchString} />

          {searchString.length !== 0 ? (
            <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
              <SearchResults
                artworks={searchResults?.data || []}
                iiifUrl={searchResults?.config.iiif_url || DEFAULT_IIIF_URL}
              />
            </ErrorBoundary>
          ) : (
            <>
              <div className="main__special-gallery">
                {artworksLoading ? (
                  <Spinner />
                ) : (
                  <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
                    <SpecialGallery
                      artworks={artworks?.data ?? []}
                      iiifUrl={artworks?.config.iiif_url ?? DEFAULT_IIIF_URL}
                    />
                  </ErrorBoundary>
                )}
              </div>
              <div className="main__other-works">
                {otherArtworksLoading ? (
                  <Spinner />
                ) : (
                  <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
                    <OtherWorks
                      artworks={otherArtworks?.data ?? []}
                      iiifUrl={
                        otherArtworks?.config.iiif_url || DEFAULT_IIIF_URL
                      }
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
