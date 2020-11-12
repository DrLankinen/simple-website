import React from 'react';
import User from '../../interfaces/User'

interface ListProps {
  users: User[]
}

export default function List(props: ListProps) {
  const { users } = props
  return (
    <>
      {users.map(user => (
        <div style={styles.userContainer}>
          <div style={styles.imgNameContainer}>
            <img style={styles.img} src={user.imageUrl} />
            <div style={styles.textContainer}>
              <p>{user.name}</p>
              <p>{user.shortBio}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

const styles = {
  userContainer: {
    marginBottom: 20,
    border: '1px white solid',
    borderRadius: 10
  },
  imgNameContainer: {
    display: 'grid'
  },
  img: {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    width: 128,
    height: 128,
    padding: 10
  },
  textContainer: {
    gridColumnStart: 2,
    gridColumnEnd: 4,
    padding: 10
  },
}
