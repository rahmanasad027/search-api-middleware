import React, { useState, useEffect } from "react";
import axios from "axios";

function useData() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  //  loading
  const [loading, setLoading] = useState(true);
  // error
  const [error, setError] = useState("");
  // cancelToken
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    if (token) {
      token.cancel("REQUEST_CANCELLED");
    }
    async function fetchData() {
      setLoading(true);
      setError("");

      const token = axios.CancelToken.source();
      setToken(token);
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`,
        { cancelToken: token.token }
      );
      setToken(undefined);
      setData(response.data.hits);
      setLoading(false);
    }
    fetchData().catch((error) => {
      if (error.message !== "REQUEST_CANCELLED") {
        const msg = error.message;
        setError(msg);
        setToken(undefined);
      }
    });
  }, [query]);

  return [data, query, setQuery];
}

export default useData;
