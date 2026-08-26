import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Users() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(endpoint).then(setUsers).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <DataView title="Members" description="The people making the tracker worth opening." columns={['Username', 'Email', 'Status']} rows={users.map((user) => [user.username || 'Unnamed member', user.email || 'No email', user.status || 'Active'])} error={error} />
}

export default Users