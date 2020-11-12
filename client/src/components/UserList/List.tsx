import React from 'react';
import User from '../../interfaces/User'

interface ListProps {
  users: User[]
}

export default function List(props: ListProps) {
  const { users } = props
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ShortBio</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr>
            <td>{user.name}</td>
            <td>{user.shortBio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
