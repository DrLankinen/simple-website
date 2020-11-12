import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Pagination from '../Pagination'
import List from './List'
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
    }
  }
`;

const RESULTS_PER_PAGE: number = 23

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );

  const [searchQuery, setSearchQuery] = useState("")

  const userFilter = (user: User) => {
    const name = user.name.toLowerCase()
    const shortBio = user.shortBio.toLowerCase()
    const search = searchQuery.toLowerCase()
    return name.includes(search) || shortBio.includes(search)
  }
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  useEffect(() => {
    if (data) {
      setFilteredUsers(data.Users.filter(userFilter))
    }
  }, [data, searchQuery])

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
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <>
            <input type="text" value={searchQuery} placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)} />
            <List users={filteredUsers.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)} />
            <Pagination setPage={setPage} currentPage={page} maxPage={maxPage} />
          </>
        )}
    </div>
  );
}
