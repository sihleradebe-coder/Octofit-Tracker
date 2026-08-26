import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <DataView title="Members" description="The people making the tracker worth opening." columns={['Username', 'Email', 'Status']} rows={users.map((user) => [user.username || 'Unnamed member', user.email || 'No email', user.status || 'Active'])} error={error} />
}

export default Users