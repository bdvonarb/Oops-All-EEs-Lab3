import * as React from "react"

const Mainstyle = {
    color: "#00ace3",
    width: "382px",
    fontFamily: "Times, Times New Roman, serif",

    
}
const Loginforadmins = () => {
    return (
      <main style={Mainstyle}>
      <><title>Login</title><form>

        <label for="email address">Email address:</label><br />
        <input type="text" id="emailaddress" name="emailaddress" /><br />

        <label for="password">Password:</label><br />
        <input type="text" id="password" name="password" /><br />

        <input type="submit" value="Submit" /><br />

      </form></>
      </main>
    )
}
export default Loginforadmins
