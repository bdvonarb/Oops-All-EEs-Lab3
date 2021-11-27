import * as React from "react"

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

const Loginforadmins = () => {
    return (
      <>
      <body style={Bodystyle}>
       <main style={Mainstyle}>
         <h1>Login</h1>
         <form>

        <label for="email address">Email address:</label><br />
        <input type="text" id="emailaddress" name="emailaddress" /><br />

        <label for="password">Password:</label><br />
        <input type="text" id="password" name="password" /><br />

        <input type="submit" value="Submit" /><br />

      </form>
      </main>
      </body>
      </>   
    )
}
export default Loginforadmins
