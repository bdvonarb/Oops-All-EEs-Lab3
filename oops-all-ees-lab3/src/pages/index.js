// Step 1: Import React
import * as React from 'react'
import {Link} from 'gatsby'
import NavBar from '../components/navbar'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <main>
      <NavBar></NavBar>
      <title>Oops All EEs</title>
      <h1>Hi Nichole</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      

    </main>
  )
}

// Step 3: Export your component
export default IndexPage