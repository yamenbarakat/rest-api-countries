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
import countries from "./data.json";
import Filter from "./components/Filter";
import Search from "./components/Search";

export default function App() {
  const [region, setRegion] = useState("Filter by Region");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState("");

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  let SelectedRegion = countries;

  function chooseRegion(region) {
    SelectedRegion = countries.filter((country) => country.region === region);
  }

  switch (region) {
    case "Africa":
      chooseRegion("Africa");
      break;

    case "America":
      chooseRegion("Americas");
      break;

    case "Asia":
      chooseRegion("Asia");
      break;

    case "Europe":
      chooseRegion("Europe");
      break;

    case "Oceania":
      chooseRegion("Oceania");
      break;

    default:
      SelectedRegion = countries;
      break;
  }

  let searchedCountry = [];

  if (query) {
    const capitalizeWords = query.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

    searchedCountry = SelectedRegion.filter((country) =>
      country.name.includes(capitalizeWords)
    );
  }

  return (
    <>
      <Header />

      <Main>
        {selectedCountry ? (
          <CountryDetails
            selectedCountry={selectedCountry}
            onSelectedCountry={handleSelectedCountry}
            countries={countries}
          />
        ) : (
          <>
            <NavBar>
              <Search query={query} onSetQuery={setQuery} />
              <Filter region={region} onSetRegion={setRegion} />
            </NavBar>

            <Countries
              countries={query ? searchedCountry : SelectedRegion}
              onSelectedCountry={handleSelectedCountry}
            />
          </>
        )}
      </Main>
    </>
  );
}
