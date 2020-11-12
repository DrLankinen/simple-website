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

enum VerifiedFilter {
  NONE,
  VERIFIED,
  NONVERIFIED
}

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterVerification, setFilterVerification] = useState<VerifiedFilter>(VerifiedFilter.NONE)

  const userFilter = (user: User) => {
    const name = user.name.toLowerCase()
    const shortBio = user.shortBio.toLowerCase()
    const search = searchQuery.toLowerCase()
    const queryFilter = name.includes(search) || shortBio.includes(search)

    switch (filterVerification) {
      case VerifiedFilter.VERIFIED:
        return queryFilter && user.isVerified
      case VerifiedFilter.NONVERIFIED:
        return queryFilter && !user.isVerified
      default:
        return queryFilter
    }
  }
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  useEffect(() => {
    if (data) {
      setFilteredUsers(data.Users.filter(userFilter))
    }
  }, [data, searchQuery, filterVerification])

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

            <select value={filterVerification} onChange={event => {
              switch (event.target.value) {
                case "0":
                  setFilterVerification(VerifiedFilter.NONE)
                  break
                case "1":
                  setFilterVerification(VerifiedFilter.VERIFIED)
                  break
                case "2":
                  setFilterVerification(VerifiedFilter.NONVERIFIED)
                  break
              }
            }}>
              <option value={VerifiedFilter.NONE}>None</option>
              <option value={VerifiedFilter.VERIFIED}>Verified</option>
              <option value={VerifiedFilter.NONVERIFIED}>Non-Verified</option>
            </select>

            <List users={filteredUsers.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE)} />
            <Pagination setPage={setPage} currentPage={page} maxPage={maxPage} />
          </>
        )}
    </div>
  );
}
