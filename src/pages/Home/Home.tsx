import "./Home.scss";

import {
  Footer,
  Header,
  OtherWorks,
  SpecialGallery,
  Spinner,
} from "@Components";
import ErrorBoundary from "@Components/ErrorBoundaryFallback/ErrorBoundary";
import Search from "@Components/Search/Search";
import SearchResults from "@Components/Search/SearchResults";
import { DEFAULT_IIIF_URL, REQUESTED_FIELDS } from "@Constants/constants";
import { ArtworksResponseType } from "@Types/types";
import { createRequestUrl } from "@Utils/functions/createRequestUrl";
import { useQuery } from "@Utils/hooks/useQuery";
import React, { useEffect, useMemo, useState } from "react";

const RANDOM_SEED = 500;
const SEARCH_RESULT_LIMIT = 15;
const GALLERY_ARTWORKS_PER_PAGE = 3;
const OTHER_ARTWORKS_LIMIT = 12;

function Home() {
  const [searchString, setSearchString] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const searchReqUrl = useMemo(
    () =>
      createRequestUrl()
        .search(searchString)
        .fields(REQUESTED_FIELDS)
        .limit(SEARCH_RESULT_LIMIT)
        .build(),
    [searchString],
  );

  const specialGalleryReqUrl = useMemo(
    () =>
      createRequestUrl()
        .limit(GALLERY_ARTWORKS_PER_PAGE)
        .page(currentPage)
        .fields(REQUESTED_FIELDS)
        .build(),
    [currentPage],
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
    url: specialGalleryReqUrl,
  });

  const {
    query: getOtherArtworks,
    data: otherArtworks,
    loading: otherArtworksLoading,
  } = useQuery<ArtworksResponseType>({
    url: createRequestUrl()
      .limit(OTHER_ARTWORKS_LIMIT)
      .page(Math.round(Math.random() * RANDOM_SEED))
      .fields(REQUESTED_FIELDS)
      .build(),
  });

  useEffect(() => {
    getArtworks();
    getOtherArtworks();
  }, []);

  useEffect(() => {
    getArtworks();
  }, [getArtworks]);

  useEffect(() => {
    if (searchString !== "") searchQuery();
  }, [searchQuery]);

  function handleSearch(str: string) {
    setSearchString(str);
  }

  function handleNextPage(page: number) {
    setCurrentPage(page);
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
            <ErrorBoundary>
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
                  <ErrorBoundary>
                    <SpecialGallery
                      artworks={artworks?.data ?? []}
                      iiifUrl={artworks?.config.iiif_url ?? DEFAULT_IIIF_URL}
                      onNextPage={handleNextPage}
                      currentPage={currentPage}
                    />
                  </ErrorBoundary>
                )}
              </div>
              <div className="main__other-works">
                {otherArtworksLoading ? (
                  <Spinner />
                ) : (
                  <ErrorBoundary>
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
