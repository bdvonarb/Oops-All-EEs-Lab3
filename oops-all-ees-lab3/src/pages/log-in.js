import * as React from "react"

const Mainstyle = {
    color: "#1be6e2",
    width: "350px",
    margin: "auto",
    margin: "100px 0px 0px 450px",
    padding: "90px",
    background: "#23463f",
    fontFamily: "Times, Times New Roman, serif",
    fontSize: "18px",
    borderRadius: "20px",
}  
const Loginforadmins = () => {
    return (
      <>
       <main style={Mainstyle}>
         <title>Login</title>
         <form>

        <label for="email address">Email address:</label><br />
        <input type="text" id="emailaddress" name="emailaddress" /><br />

        <label for="password">Password:</label><br />
        <input type="text" id="password" name="password" /><br />

        <input type="submit" value="Submit" /><br />

      </form>
      </main>
      </>   
    )
}
export default Loginforadmins
