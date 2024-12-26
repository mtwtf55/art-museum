import "./Home.scss";

import {
  ErrorBoundary,
  Footer,
  Header,
  LoadingPlaceholder,
  OtherWorks,
  Search,
  SearchResults,
  SpecialGallery,
} from "@Components";
import { DEFAULT_IIIF_URL, REQUESTED_FIELDS } from "@Constants";
import { ArtworksResponseType } from "@Types";
import { createRequestUrl, mutateSet, useQuery } from "@Utils";
import React, { useEffect, useMemo, useState } from "react";

const SEARCH_RESULT_LIMIT = 30;
const OTHER_ARTWORKS_LIMIT = 15;
const GALLERY_ARTWORKS_PER_PAGE = 3;
const RANDOM_SEED = 300;

export function Home() {
  const [searchString, setSearchString] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const specialGalleryOffset = useMemo(
    () => Math.round(Math.random() * RANDOM_SEED),
    [],
  );
  const otherArtworksOffset = useMemo(
    () => Math.round(Math.random() * RANDOM_SEED),
    [],
  );

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
        .offset(specialGalleryOffset)
        .fields(REQUESTED_FIELDS)
        .build(),
    [currentPage],
  );

  const {
    query: searchQuery,
    data: searchResults,
    setData: setSearchResults,
    loading: searchIsLoading,
  } = useQuery<ArtworksResponseType>({
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
    setData: setOtherArtworks,
  } = useQuery<ArtworksResponseType>({
    url: createRequestUrl()
      .offset(otherArtworksOffset)
      .limit(OTHER_ARTWORKS_LIMIT)
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

  const handleSetSearchResults = mutateSet(setSearchResults);
  const handleSetOtherArtworks = mutateSet(setOtherArtworks);

  return (
    <div>
      <Header />
      <main className="main">
        <div className="container">
          <h1 className="main__title">
            Let&#39;s Find Some{" "}
            <span className={"main__title__inner"}>Art</span>
            <br /> Here!
          </h1>

          <Search onSearch={handleSearch} initialValue={searchString} />

          {searchString.length !== 0 ? (
            searchIsLoading ? (
              <LoadingPlaceholder />
            ) : (
              <ErrorBoundary>
                <SearchResults
                  artworks={searchResults?.data || []}
                  iiifUrl={searchResults?.config.iiif_url || DEFAULT_IIIF_URL}
                  setArtworks={handleSetSearchResults}
                />
              </ErrorBoundary>
            )
          ) : artworksLoading || otherArtworksLoading ? (
            <LoadingPlaceholder />
          ) : (
            <>
              <section className="main__special-gallery">
                <ErrorBoundary>
                  <SpecialGallery
                    artworks={artworks?.data ?? []}
                    iiifUrl={artworks?.config.iiif_url ?? DEFAULT_IIIF_URL}
                    onNextPage={handleNextPage}
                    currentPage={currentPage}
                  />
                </ErrorBoundary>
              </section>

              <section className="main__other-works">
                <ErrorBoundary>
                  <OtherWorks
                    artworks={otherArtworks?.data ?? []}
                    iiifUrl={otherArtworks?.config.iiif_url || DEFAULT_IIIF_URL}
                    setArtworks={handleSetOtherArtworks}
                  />
                </ErrorBoundary>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
