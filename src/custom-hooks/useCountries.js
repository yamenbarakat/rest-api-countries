import { useEffect, useState } from "react";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        if (!res.ok) {
          throw new Error();
        }

        setCountries(data);
        setStatus("ready");
      } catch (err) {
        setStatus("error");
      }
    }

    fetchCountries();
  }, []);

  return [countries, status];
}
