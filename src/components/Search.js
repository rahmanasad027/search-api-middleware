import React from "react";
import useData from "../hooks/useData";

const Search = () => {
  const [data, query, setQuery] = useData();

  const onType = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Hi there</h1>
      <input name="search" type="text" onChange={onType} />
      <ul>
        {data.map((data) => (
          <li key={data.objectId}>
            <a href={data.url}>{data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
