import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Members'],
  ['/workouts', 'Workouts'],
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">OCTOFIT TRACKER / 2026</p>
      <h1>Move with your team.</h1>
      <p className="lead">Your training, your people, and the next challenge in one place.</p>
      <div className="overview-grid">
        <article><strong>5</strong><span>connected views</span></article>
        <article><strong>8000</strong><span>API service port</span></article>
        <article><strong>LIVE</strong><span>team data ready</span></article>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">OCTOFIT<span>•</span></NavLink>
        <nav aria-label="Primary navigation">
          {navigation.map(([path, label]) => (
            <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App