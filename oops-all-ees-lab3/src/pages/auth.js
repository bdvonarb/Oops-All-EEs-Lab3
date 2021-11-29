import * as React from "react"
import { navigate } from "gatsby" 

export const Window = () => typeof window !=="undefined"

export const getUser = () =>
    Window() && window.localstorage.getItem("OAEEsuser")
    ? JSON.parse(window.localstorage.getItem("OAEEsuser"))
    : {}

    const isUser = User => 
        window.localstorage.setItem("OAEEsuser", JSON.stringify(User))

export const loginsystem = ({email, password}) => {
    if (email === 'admin@oopsallees.com' && password === 'guest') {
        navigate('/')
        return isUser(
            {
            email: 'admin',
            name: 'administator',
        }
        )
    }
    else {
        return false
    }
}

export const isloggedin = () => {
    const User = getUser()
     
    return !!User.email
}

//export const logout = callback => {
   // isUser({})
   // callback()
//}