import { useEffect, useState } from "react";

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

export default function App() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("Filter by Region");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
      setLoader(false);
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");

    if (savedMode) {
      document.body.classList.add("dark");
    }
  }, []);

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  }

  // selected region
  let selectedRegion = countries;

  function chooseRegion(region) {
    selectedRegion = countries.filter((country) => country.region === region);
  }

  if (!region.startsWith("Filter")) {
    if (region === "All") {
      selectedRegion = countries;
    } else {
      chooseRegion(region);
    }
  }

  // searched country
  let searchedCountry = [];

  if (query) {
    const capitalizeWords = query.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

    searchedCountry = selectedRegion.filter((country) =>
      country.name.common.includes(capitalizeWords)
    );
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />

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
                />
              </>
            )}
          </Main>
        </>
      )}
    </>
  );
}
