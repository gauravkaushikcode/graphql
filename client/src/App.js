import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import DisplayUsers from "./DisplayUsers";
import "./App.css";
import DisplayMovies from "./DisplayMovies";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <>
      <ApolloProvider client={client}>
        <h1>List of Users</h1>
        <DisplayUsers />
        <h1>List of Movies</h1>
        <DisplayMovies />
      </ApolloProvider>
    </>
  );
}

export default App;
