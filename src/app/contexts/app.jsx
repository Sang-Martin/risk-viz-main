'use client'
import { createContext, useReducer } from "react";
import {datas} from '../data/data'

const initialState = {
    locations : [...datas],
    pin: null,
    year: 2030,
}

const reducer = (state, action) => {
    switch (action.type) {
        
        case "GET_PIN": {
            return {
                ...state,
                pin: action.payload
            }
        }
        case "CHANGE_YEAR": {
            return {
                ...state,
                year: action.payload
            }
        }
        default: 
            return state
    }
}

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const value = useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}