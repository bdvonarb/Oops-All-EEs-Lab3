import * as React from 'react'
import '../styles/fa/css/all.css'
import '../styles/bootstrap.min.css'
import '../styles/globalstyle.css'
import background from '../images/geometric-leaves.png'
import NavBar from '../components/navbar'

const Layout = ({ pageTitle, children }) => {
    return (
      <div style={{ width:"100%", height:"100%", backgroundImage: `url(${background})`, backgroundRepeat: 'repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'contain', WebkitBackgroundSize: 'contain', display: 'flex', flexDirection: 'column' }}>
        <title>{pageTitle}</title>
        <NavBar></NavBar>
        <h1>{pageTitle}</h1>
        <main style={{height:"calc(100% - 3em - 100px"}}>
          {children}
        </main>
      </div>
      
    )
  }
  export default Layout