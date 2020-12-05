import React, { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      // fetch request to our URL with API KEY and query search
      const res = await fetch(url);
      // fetch returns data that we then convert to JSON object in order to access
      const data = await res.json();
      // setMovies the data so we can see that is actually flowing to our project.
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name:
        </label>
        <input
          className="input "
          type="text"
          name="query"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <div className="card-item">
        {movies
          // .filter((movie) => movie.poster_path)
          .map((movie) => (
            <h2 key={movie.id}>{movie.original_title}</h2>
          ))}
      </div>
    </div>
  );
}

export default Search;
