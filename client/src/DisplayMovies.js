import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query GetMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

function DisplayMovies() {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: movieSearchedData, error: fetchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  return loading ? (
    <h1>Loadind movies...</h1>
  ) : error ? (
    console.log(error)
  ) : (
    <div>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year Of Publication</th>
            <th>Is This Movie In Theaters</th>
          </tr>
          {data &&
            data.movies.map((movie) => {
              return (
                <tr>
                  <td>{movie.id}</td>
                  <td>{movie.name}</td>
                  <td>{movie.yearOfPublication}</td>
                  <td>{String(movie.isInTheaters)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch This Movie Details
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Year Of Publication</th>
                    <th>Is This Movie In Theaters</th>
                  </tr>
                  <tr>
                    <td>{movieSearchedData.movie.id}</td>
                    <td>{movieSearchedData.movie.name}</td>
                    <td>{movieSearchedData.movie.yearOfPublication}</td>
                    <td>{String(movieSearchedData.movie.isInTheaters)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {fetchError && <h1> There was an error fetching the movie</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplayMovies;
