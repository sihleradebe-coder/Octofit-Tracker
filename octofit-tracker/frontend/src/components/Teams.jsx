import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <DataView title="Teams" description="Find your crew and keep the momentum visible." columns={['Team', 'Members', 'Goal']} rows={teams.map((team) => [team.name || 'Unnamed team', team.members?.length || team.memberCount || 0, team.goal || 'Keep moving'])} error={error} />
}

export default Teams