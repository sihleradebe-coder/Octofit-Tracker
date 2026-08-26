import { useEffect, useState } from 'react'
import { DataView } from './Activities.jsx'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <DataView title="Workouts" description="A practical next session, ready when you are." columns={['Workout', 'Focus', 'Difficulty']} rows={workouts.map((workout) => [workout.name || workout.title || 'Workout', workout.focus || workout.type || 'Full body', workout.difficulty || 'Adaptable'])} error={error} />
}

export default Workouts