import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Pagination from './Pagination'

interface User {
  id: number;
  name: string;
  shortBio: string;
  isVerified: boolean;
}

interface UserData {
  Users: User[];
}

interface UserVars {
  name: string;
}

const GET_ROCKET_INVENTORY = gql`
  query GetUsers {
    Users {
      id
      name
      shortBio
      isVerified
    }
  }
`;

const RESULTS_PER_PAGE: number = 23

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );

  const maxPage: number = Math.ceil((data?.Users.length ?? 1) / RESULTS_PER_PAGE) - 1
  const [page, setPage] = useState(1)

  return (
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ShortBio</th>
                </tr>
              </thead>
              <tbody>
                {data && data.Users.slice(page * RESULTS_PER_PAGE, (page + 1) * RESULTS_PER_PAGE).map(user => (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.shortBio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination setPage={setPage} currentPage={page} maxPage={maxPage} />
          </>
        )}
    </div>
  );
}
