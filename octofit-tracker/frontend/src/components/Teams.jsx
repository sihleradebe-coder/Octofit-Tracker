import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Teams() {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection(endpoint).then(setTeams).catch((loadError) => setError(loadError.message)) }, [endpoint])
  return <DataView title="Teams" description="Find your crew and keep the momentum visible." columns={['Team', 'Members', 'Goal']} rows={teams.map((team) => [team.name || 'Unnamed team', team.members?.length || team.memberCount || 0, team.goal || 'Keep moving'])} error={error} />
}

export default Teams