import * as React from "react"

export const Broswer = () => typeof window !=="undefined"

export const getUser = () =>
    Broswer() && window.localstorage.getItem("gatsbyuser")
    ? JSON.parse(window.localstorage.getItem("gatsbyuser"))
    : {}

    const setUser = User => 
        window.localstorage.setItem("gatsbyuser", JSON.stringify(User))

export const handlelogin = ({email, password}) => {
    if (email === 'admin@oopsallees.com' && password === 'guest') {
        return setUser({
            email: 'admin',
            name: 'administator',
        })
    }
    else {
        return false
    }
}

export const isloggedin = () => {
    const User = getUser()
     
    return !!User.email
}

export const logout = callback => {
    setUser({})
    callback()
}