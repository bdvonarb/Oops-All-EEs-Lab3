import { navigate } from "gatsby-link"
import * as React from "react"
import {loginsystem, isloggedin} from "../components/auth"
//import Layout from '../components/layout'


const Bodystyle = {
  backgroundColor: "#ffcd00",
}

const Mainstyle = {
    color: "white",
    width: "350px",
    margin: "auto",
    marginTop: "10%",
    padding: "90px",
    backgroundColor: "black",
    fontFamily: "Times, Times New Roman, serif",
    fontSize: "18px",
    borderRadius: "20px",
}  

class Loginforadmins extends React.Component {
  state = {
    email: ``,
    password: ``,
    submit: false
  }
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    loginsystem(this.state)
    this.forceUpdate()
  }

  render(){
    if (isloggedin()) {
      setTimeout(() => navigate(`/`), 3000)
    }
    return (
     // <Layout pageTitle="Oops All EEs Doodle">
      <>
      <div style={Bodystyle}>
       <main style={Mainstyle}>
         <h1>Login</h1>
         <p>{isloggedin() && "Already Logged In, redirecting to home"}</p>
         <form onSubmit={event => {
           this.handleSubmit(event)
         }}>

        <label htmlFor="email address">Email address:</label><br />
        <input type="text" id="emailaddress" name="email" onChange={this.handleUpdate} disabled={isloggedin()}/><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" onChange={this.handleUpdate} disabled={isloggedin()}/><br />

        <input type="submit" value="Submit" disabled={isloggedin()}/><br />

      </form>
      </main>
      </div>
      </>   
     // </Layout>
    )
  }
}
export default Loginforadmins
