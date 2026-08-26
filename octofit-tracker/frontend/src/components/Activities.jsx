import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return <DataView title="Activities" description="Recent movement across your teams." columns={['Type', 'Duration', 'Date']} rows={activities.map((activity) => [activity.type || 'Training', `${activity.duration || 0} min`, formatDate(activity.date)])} error={error} />
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Not dated'
}

function DataView({ title, description, columns, rows, error }) {
  return <section className="data-view"><div className="section-heading"><div><p className="eyebrow">TRACKER DATA</p><h1>{title}</h1><p className="lead">{description}</p></div><span className="record-count">{rows.length} records</span></div>{error && <p className="alert alert-warning">{error}. Check that the API is running.</p>}{!error && <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td colSpan={columns.length}>No records yet.</td></tr>}</tbody></table></div>}</section>
}

export { DataView }
export default Activities