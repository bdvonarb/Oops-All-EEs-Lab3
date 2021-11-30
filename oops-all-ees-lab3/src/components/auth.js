import * as React from "react"
import { navigate } from "gatsby" 

export const Window = () => typeof window !=="undefined"

export const getUser = () =>
    Window() && window.localStorage.getItem("OAEEsuser")
    ? JSON.parse(window.localStorage.getItem("OAEEsuser"))
    : {}

 const setUser = User => 
      window.localStorage.setItem("OAEEsuser", JSON.stringify(User))

export const loginsystem = ({email, password}) => {
    console.log("hi")
    console.log(email)
    console.log(password)
    if (email === 'admin@oopsallees.com' && password === 'guest') {
        console.log("success")
        return setUser(
            {
            email: 'admin',
            name: 'administator',
        }
        )
    }
    else {
        console.log("fail")
        return false
    }
}

export const isloggedin = () => {
    console.log("checking")
    const User = getUser()
    console.log(User)
     
    return !!User.email
}

export const logout = callback => {
    setUser({})
    console.log("logged out")
    callback()
  }