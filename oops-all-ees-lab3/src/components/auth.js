export const Window = () => typeof window !=="undefined"

export const getUser = () =>
    Window() && window.localStorage.getItem("OAEEsuser")
    ? JSON.parse(window.localStorage.getItem("OAEEsuser"))
    : {}

const setUser = User => 
    window.localStorage.setItem("OAEEsuser", JSON.stringify(User))

export const loginsystem = ({email, password}) => {
    if (email === 'admin@oopsallees.com' && password === 'guest') {
        setUser({
            email: 'admin',
            name: 'administrator',
        })
        return true
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