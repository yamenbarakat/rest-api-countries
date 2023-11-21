import { useState } from "react";

// css files
import "./index.css";
import "./components/normlize.css";
import "./components/color.css";

// js files
import Header from "./components/Header";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

import Filter from "./components/Filter";
import Search from "./components/Search";
import Loader from "./components/Loader";

import { useCountries } from "./custom-hooks/useCountries";
import { useLocalStorageTheme } from "./custom-hooks/useLocalStorageTheme";
import { useSelection } from "./custom-hooks/useSelection";

export default function App() {
  const [region, setRegion] = useState("Filter by Region");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState("");

  // custom hooks
  const [countries, loader, error] = useCountries();
  const [setMode] = useLocalStorageTheme();
  const [selectedRegion, searchedCountry] = useSelection(
    countries,
    region,
    query
  );

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header onSetMode={setMode} />

          {error ? (
            <h2 className="error">{error}</h2>
          ) : (
            <Main>
              {selectedCountry ? (
                <CountryDetails
                  selectedCountry={selectedCountry}
                  onSelectedCountry={handleSelectedCountry}
                  countries={countries}
                  OnSetQuery={setQuery}
                />
              ) : (
                <>
                  <NavBar>
                    <Search query={query} onSetQuery={setQuery} />
                    <Filter region={region} onSetRegion={setRegion} />
                  </NavBar>

                  <Countries
                    countries={query ? searchedCountry : selectedRegion}
                    onSelectedCountry={handleSelectedCountry}
                    error={error}
                  />
                </>
              )}
            </Main>
          )}
        </>
      )}
    </>
  );
}
