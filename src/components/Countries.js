export default function Countries({ countries, onSelectedCountry }) {
  return (
    <section className="countries">
      <div className="container">
        {countries.length === 0 ? (
          <p className="no-result">No Results Found</p>
        ) : (
          countries.map((country) => (
            <Country
              country={country}
              key={country.name}
              onSelectedCountry={onSelectedCountry}
            />
          ))
        )}
      </div>
    </section>
  );
}

function Country({ country, onSelectedCountry }) {
  return (
    <div className="country" onClick={() => onSelectedCountry(country)}>
      <img src={country.flag} alt={`${country.name} flag`} />
      <div className="details">
        <h2>{country.name}</h2>
        <ul>
          <li>
            <span>Population:</span>{" "}
            <span>{country.population.toLocaleString()}</span>
          </li>
          <li>
            <span>Region:</span> <span>{country.region}</span>
          </li>
          <li>
            <span>Capital:</span> <span>{country.capital}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
