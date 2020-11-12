import React, { useState, useEffect } from 'react';
import User from '../../interfaces/User'
import { useHistory, useLocation } from 'react-router-dom';
import { url } from 'inspector';

enum VerifiedFilterMode {
  NONE = "none",
  VERIFIED = "verified",
  NONVERIFIED = "nonverified"
}

interface FilterProps {
  allUsers: User[],
  setFilteredUsers: (filteredUsers: User[]) => void,
  urlParams: URLSearchParams
}

export default function Filter(props: FilterProps) {
  const { allUsers, setFilteredUsers } = props;

  const history = useHistory()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const searchQuery: string = urlParams.get("search") || ""
  const verifiedFilter: VerifiedFilterMode = urlParams.get("verified") as VerifiedFilterMode

  const [searchInput, setSearchInput] = useState<string>("")

  const userFilter = (user: User) => {
    const name = user.name.toLowerCase();
    const shortBio = user.shortBio.toLowerCase();
    const search = searchQuery.toLowerCase();
    const queryFilter = name.includes(search) || shortBio.includes(search);

    switch (verifiedFilter) {
      case VerifiedFilterMode.VERIFIED:
        return queryFilter && user.isVerified;
      case VerifiedFilterMode.NONVERIFIED:
        return queryFilter && !user.isVerified;
      default:
        return queryFilter;
    }
  };

  useEffect(() => {
    setFilteredUsers(allUsers.filter(userFilter));
  }, [allUsers, searchQuery, verifiedFilter]);

  const changeUrlParamHelper = (key: string, value: string, deleteIfSame: string) => {
    if (searchInput === deleteIfSame) {
      urlParams.delete(key)
    } else {
      urlParams.set(key, value)
    }
    history.push({
      pathname: "/",
      search: urlParams.toString()
    })
  }

  return (
    <>
      <div>
        <input type="text" style={styles.searchBar} value={searchInput} placeholder="Search" onChange={(event) => setSearchInput(event.target.value)} />
        <button onClick={() => {
          changeUrlParamHelper("search", searchInput, "")
        }}>Go</button>
      </div>
      <div style={styles.verificationFilter}>
        <label style={styles.verificationFilterLabel}>Verification: </label>
        <select value={verifiedFilter} onChange={event => {
          changeUrlParamHelper("verified", event.target.value, VerifiedFilterMode.NONE)
        }}>
          <option value={VerifiedFilterMode.NONE}>None</option>
          <option value={VerifiedFilterMode.VERIFIED}>Verified</option>
          <option value={VerifiedFilterMode.NONVERIFIED}>Non-Verified</option>
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