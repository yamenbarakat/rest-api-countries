import { useEffect, useState } from "react";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        setError("");
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            "⛔ Failt to fetch countries, please try to reload the page later"
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

  return [countries, loader, error];
}
