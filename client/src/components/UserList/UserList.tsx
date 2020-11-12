import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Pagination from '../Pagination'
import List from './List'
import Filter from './Filter'
import User from '../../interfaces/User'

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
      imageUrl
    }
  }
`;

const RESULTS_PER_PAGE: number = 13

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );

  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const [maxPage, setMaxPage] = useState<number>(1)
  useEffect(() => {
    if (filteredUsers.length === 0) {
      setMaxPage(1)
    } else {
      setMaxPage(Math.ceil(filteredUsers.length / RESULTS_PER_PAGE))
    }
  }, [filteredUsers])

  const [page, setPage] = useState(1)
  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage)
    }
  }, [maxPage])

  return (
    <div style={styles.container}>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <>
            <Filter users={data ? data.Users : []} setFilteredUsers={setFilteredUsers} />
            <List users={filteredUsers.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)} />
            <Pagination setPage={setPage} currentPage={page} maxPage={maxPage} />
          </>
        )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    paddingBottom: 100
  }
}