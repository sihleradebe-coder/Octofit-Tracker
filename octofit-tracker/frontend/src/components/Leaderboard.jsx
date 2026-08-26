import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <DataView title="Leaderboard" description="A little friendly pressure for the week ahead." columns={['Rank', 'Athlete', 'Points']} rows={entries.map((entry, index) => [entry.rank || index + 1, entry.username || entry.user || 'Athlete', entry.points || entry.score || 0])} error={error} />
}

export default Leaderboard