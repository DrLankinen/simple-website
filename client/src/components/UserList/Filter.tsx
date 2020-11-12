import React, { useState, useEffect } from 'react';
import User from '../../interfaces/User'

enum VerifiedFilter {
  NONE = "none",
  VERIFIED = "verified",
  NONVERIFIED = "nonverified"
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
    const name = user.name.toLowerCase();
    const shortBio = user.shortBio.toLowerCase();
    const search = searchQuery.toLowerCase();
    const queryFilter = name.includes(search) || shortBio.includes(search);

    switch (filterVerification) {
      case VerifiedFilter.VERIFIED:
        return queryFilter && user.isVerified;
      case VerifiedFilter.NONVERIFIED:
        return queryFilter && !user.isVerified;
      default:
        return queryFilter;
    }
  };

  useEffect(() => {
    setFilteredUsers(users.filter(userFilter));
  }, [users, searchQuery, filterVerification]);

  return (
    <>
      <div>
        <input type="text" style={styles.searchBar} value={searchQuery} placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)} />
      </div>
      <div style={styles.verificationFilter}>
        <label style={styles.verificationFilterLabel}>Verification: </label>
        <select value={filterVerification} onChange={event => setFilterVerification(event.target.value as VerifiedFilter)}>
          <option value={VerifiedFilter.NONE}>None</option>
          <option value={VerifiedFilter.VERIFIED}>Verified</option>
          <option value={VerifiedFilter.NONVERIFIED}>Non-Verified</option>
        </select>
      </div>
    </>
  )
}

const styles = {
  searchBar: {
    height: 25,
    width: 500,
    fontSize: 20,
  },
  verificationFilter: {
    padding: 20
  },
  verificationFilterLabel: {
    fontSize: 13
  }
}