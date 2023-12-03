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
import Error from "./components/Error";

import { useCountries } from "./custom-hooks/useCountries";
import { useLocalStorageTheme } from "./custom-hooks/useLocalStorageTheme";

function handleSelectedRegion(countries, region) {
  if (region.startsWith("Filter")) return countries;

  if (region === "All") {
    return countries;
  } else {
    return countries.filter((country) => country.region === region);
  }
}

function handleSearchedCountry(query, selectedRegion) {
  if (!query) return;

  const capitalizeWords = query.replace(/\b\w/g, (char) => char.toUpperCase());

  return selectedRegion.filter((country) =>
    country.name.common.includes(capitalizeWords)
  );
}

export default function App() {
  const [region, setRegion] = useState("Filter by Region");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState("");

  // custom hooks
  const [countries, status] = useCountries();
  const [setMode] = useLocalStorageTheme();

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  }

  const selectedRegion = handleSelectedRegion(countries, region);

  const searchedCountry = handleSearchedCountry(query, selectedRegion);

  return (
    <>
      {status === "loading" && <Loader />}

      {status === "error" && <Error />}

      {status === "ready" && (
        <Main>
          <Header onSetMode={setMode} />

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
                <Filter
                  region={region}
                  onSetRegion={setRegion}
                  onSetQuery={setQuery}
                />
              </NavBar>

              <Countries
                countries={query ? searchedCountry : selectedRegion}
                onSelectedCountry={handleSelectedCountry}
              />
            </>
          )}
        </Main>
      )}
    </>
  );
}
