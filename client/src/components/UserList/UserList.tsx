import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Pagination from '../Pagination'
import List from './List'
import Filter from './Filter'
import User from '../../interfaces/User'
import { useLocation, useHistory } from 'react-router-dom';

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

  const history = useHistory()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    const newPage = parseInt(urlParams.get("page") || "1")
    if (newPage > maxPage) {
      urlParams.set("page", maxPage.toString())
      history.push({
        pathname: "/",
        search: urlParams.toString()
      })
    }
    setPage(newPage)
  }, [maxPage, urlParams])

  return (
    <div style={styles.container}>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <>
            <Filter allUsers={data ? data.Users : []} setFilteredUsers={setFilteredUsers} urlParams={urlParams} />
            <List users={filteredUsers.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)} />
            <Pagination currentPage={page} maxPage={maxPage} />
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