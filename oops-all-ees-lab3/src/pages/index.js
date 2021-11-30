// Step 1: Import React
import * as React from 'react'
import {Link, navigate} from 'gatsby'
import { logout } from '../components/auth'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <main>
      <title>Oops All EEs</title>
      <h1>Hi Nichole</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <Link to="/log-in">Log In</Link><br/>
      <Link to="/log-in" onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/log-in`))
            }}>Log Out</Link><br/>
      <Link to="/poll-list">Poll List</Link>
    </main>
  )
}

// Step 3: Export your component
export default IndexPage