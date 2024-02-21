import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetUsers {
    users {
      name
      age
      id
      nationality
      username
    }
  }
`;

function DisplayUsers() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  return loading ? (
    <h1>Loadind users...</h1>
  ) : error ? (
    console.log(error)
  ) : (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Nationality</th>
          <th>Username</th>
        </tr>
        {data &&
          data.users.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.nationality}</td>
                <td>{user.username}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default DisplayUsers;
