import { useEffect } from "react";

export default function CountryDetails({
  selectedCountry,
  onSelectedCountry,
  countries,
  OnSetQuery,
}) {
  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = selectedCountry;

  const borders = selectedCountry.borders?.map((country) => {
    return countries.find((code) => code.alpha3Code === country);
  });

  function handleArray(array) {
    return array.reduce((acc, el, i, arr) => {
      if (arr.length === 1 || i === 0) return el.name;

      if (arr.length !== i + 1) {
        acc += ", ";
      } else {
        acc += " and ";
      }

      return (acc += el.name);
    }, "");
  }

  function handleSelectedCountry(name) {
    const country = countries.find((country) => country.name === name);

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
            <img src={flag} alt={`${name} flag`} />
          </div>
          <div className="details">
            <h2>{name}</h2>
            <div className="info">
              <ul>
                <li>
                  <span>native name</span>: <span>{nativeName}</span>
                </li>
                <li>
                  <span>population</span>:{" "}
                  <span>{population.toLocaleString()}</span>
                </li>
                <li>
                  <span>region</span>: <span>{region}</span>
                </li>
                <li>
                  <span>sub region</span>: <span>{subregion}</span>
                </li>
                <li>
                  <span>capital</span>: <span>{capital}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>top level domain</span>: <span>{topLevelDomain}</span>
                </li>
                <li>
                  <span>currencies</span>:{" "}
                  <span>{handleArray(currencies)}</span>
                </li>
                <li>
                  <span>languages</span>: <span>{handleArray(languages)}</span>
                </li>
              </ul>
            </div>
            <div className="borders-countries">
              <p>Border Countries:</p>
              <div className="borders">
                {borders
                  ? borders.map((country) => (
                      <button
                        key={country.name}
                        onClick={() => handleSelectedCountry(country.name)}
                      >
                        {country.name}
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
