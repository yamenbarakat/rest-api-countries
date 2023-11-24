import { useEffect, useRef } from "react";

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

  function handleRemoveSelectedCountry() {
    onSelectedCountry(null);
    OnSetQuery("");
  }

  // set some styles dynamically
  const bordersContainer = useRef();
  const borderbuttons = useRef();

  useEffect(() => {
    const buttons = borderbuttons.current.children;

    // change grid values based on the number of buttons
    if (buttons.length > 4) {
      bordersContainer.current.style.gridTemplateColumns = "none";
    } else {
      bordersContainer.current.style.gridTemplateColumns = "auto 1fr";
    }

    const buttonsArray = Array.from(buttons);

    //Find the maximum width among all buttons elements
    const maxWidth = Math.max(
      ...buttonsArray.map((child) => child.clientWidth)
    );

    // Set the width of all child elements to the biggest width
    buttonsArray.forEach((child) => {
      child.style.width = `${maxWidth}px`;
    });
  }, [borders]);

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
            <div className="borders-countries" ref={bordersContainer}>
              <p>Border Countries:</p>
              <div className="borders" ref={borderbuttons}>
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
