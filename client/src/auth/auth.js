import React, { useReducer, createContext } from 'react'

const initialState = {
    user: null
}

initialState.user = localStorage.getItem('jwtToken')

export const AuthContext = createContext({
    user: null,
    login: (data) => { },
    logout: () => { }
})

const authReducer = (state, action) => {
    debugger;
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const login = (data) => {
        localStorage.setItem("jwtToken", data.token)
        dispatch({
            type: "LOGIN",
            payload: data
        })
    }

    const logout = () => {
        localStorage.removeItem("jwtToken")
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}