import * as React from 'react'
import '../styles/fa/css/all.css'
import '../styles/bootstrap.min.css'
import '../styles/globalstyle.css'
import background from '../images/geometric-leaves.png'
import NavBar from '../components/navbar'

const Layout = ({ pageTitle, children }) => {
    return (
      <div style={{ width:"100%", height:"100%", backgroundImage: `url(${background})`, backgroundRepeat: 'repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'contain', WebkitBackgroundSize: 'contain' }}>
        <title>{pageTitle}</title>
        <NavBar></NavBar>
        <main>
        
          <h1>{pageTitle}</h1>
          {children}
          
        </main>
      </div>
      
    )
  }
  export default Layout