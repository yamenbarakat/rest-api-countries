import { useEffect, useState } from "react";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        setError("");
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            "⛔ Something went wrong with fetching countries, please try again later"
          );
        }

        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoader(false);
      }
    }

    fetchCountries();
  }, []);

  return [countries, isLoading, error];
}
