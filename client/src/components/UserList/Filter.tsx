import React, { useState, useEffect } from 'react';
import User from '../../interfaces/User'

enum VerifiedFilter {
  NONE,
  VERIFIED,
  NONVERIFIED
}

interface FilterProps {
  users: User[],
  setFilteredUsers: (filteredUsers: User[]) => void
}

export default function Filter(props: FilterProps) {
  const { users, setFilteredUsers } = props;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterVerification, setFilterVerification] = useState<VerifiedFilter>(VerifiedFilter.NONE);

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
  };

  useEffect(() => {
    setFilteredUsers(users.filter(userFilter))
  }, [users, searchQuery, filterVerification]);

  return (
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
    </>
  )
}