import { useEffect } from "react";

export default function CountryDetails({
  selectedCountry,
  onSelectedCountry,
  countries,
  OnSetQuery,
}) {
  const {
    flags,
    name: { common: name },
    name: { nativeName },
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = selectedCountry;

  const bordersOfCountry = borders?.map((country) => {
    return countries.find((code) => code.cca3 === country);
  });

  function handleArrayLangs(array) {
    return array.reduce((acc, el, i, arr) => {
      if (arr.length === 1 || i === 0) return el;

      if (arr.length !== i + 1) {
        acc += ", ";
      } else {
        acc += " and ";
      }

      return (acc += el);
    }, "");
  }

  function handleSelectedCountry(name) {
    const country = countries.find((country) => country.name.common === name);

    onSelectedCountry(country);
  }

  // set some styles dynamically
  useEffect(() => {
    const bordersContainer = document.querySelector(".borders-countries");
    const children = document.querySelectorAll(".borders button");

    // change grid values base on the number of buttons
    if (children.length > 4) {
      bordersContainer.style.gridTemplateColumns = "none";
    } else {
      bordersContainer.style.gridTemplateColumns = "auto 1fr";
    }

    // make all the buttons have the same size as the bigger one
    // Find the maximum width among all child elements
    const maxWidth = Math.max(
      ...Array.from(children).map((child) => child.clientWidth)
    );

    // Set the width of all child elements to the biggest width
    children.forEach((child) => {
      child.style.width = `${maxWidth}px`;
    });
  }, [borders]);

  function handleRemoveSelectedCountry() {
    onSelectedCountry(null);
    OnSetQuery("");
  }

  return (
    <div className="country-details">
      <div className="container">
        <button
          className="back"
          onClick={() => onSelectedCountry(handleRemoveSelectedCountry)}
        >
          <i className="fa-solid fa-arrow-left-long"></i> Back
        </button>
        <div className="content">
          <div className="img-container">
            <img src={flags.svg} alt={`${flags.alt}`} />
          </div>
          <div className="details">
            <h2>{name}</h2>
            <div className="info">
              <ul>
                <li>
                  <span>native name: </span>
                  <span>{Object.values(nativeName)[0].official}</span>
                </li>
                <li>
                  <span>population: </span>
                  <span>{population.toLocaleString()}</span>
                </li>
                <li>
                  <span>region: </span>
                  <span>{region}</span>
                </li>
                <li>
                  <span>sub region: </span>
                  <span>{subregion}</span>
                </li>
                <li>
                  <span>capital: </span>
                  <span>{capital}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>top level domain: </span> <span>{tld[0]}</span>
                </li>
                <li>
                  <span>currencies: </span>
                  <span>{Object.values(currencies)[0].name}</span>
                </li>
                <li>
                  <span>languages: </span>
                  <span>
                    {handleArrayLangs(Array.from(Object.values(languages)))}
                  </span>
                </li>
              </ul>
            </div>
            <div className="borders-countries">
              <p>Border Countries:</p>
              <div className="borders">
                {bordersOfCountry
                  ? bordersOfCountry.map((country) => (
                      <button
                        key={country.name.common}
                        onClick={() =>
                          handleSelectedCountry(country.name.common)
                        }
                      >
                        {country.name.common}
                      </button>
                    ))
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
