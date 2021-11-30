import * as React from 'react'
import '../styles/fa/css/all.css'
import '../styles/bootstrap.min.css'
import background from '../images/geometric-leaves.png'
import NavBar from '../components/navbar'

const Layout = ({ pageTitle, children }) => {
    return (
      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundSize: 'cover', webkitBackgroundSize: 'cover' }}>
        <title>{pageTitle}</title>
        <nav>
        
        </nav>
        <NavBar></NavBar>
        <main>
        
          <h1>{pageTitle}</h1>
          {children}
          
        </main>
      </div>
      
    )
  }
  export default Layout