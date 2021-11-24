// Step 1: Import React
import * as React from 'react'
import NavBar from '../components/navbar'
import Layout from '../components/layout'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <main>
      <NavBar></NavBar>
      <Layout pageTitle="Oops All EEs Doodle">
      <h1>Hi Nichole</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      



      <p> im making this following gatsby tutorial.</p>
    </Layout>
    </main>
  )
}

// Step 3: Export your component
export default IndexPage