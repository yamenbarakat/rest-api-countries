export function useSelection(countries, region, query) {
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

  return [selectedRegion, searchedCountry];
}
