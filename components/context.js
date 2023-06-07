import React from "react";
import { useState } from "react";

const appContext = React.createContext()

function ContextProvider(props) {
    const [currentScreen, setCurrentScreen] = useState('home')

    function updateState(newValue) {
        setCurrentScreen(newValue)
    }

    return (
        <appContext.Provider value={{currentScreen, updateState}}>
            {props.children}
        </appContext.Provider>
    )
}

export {appContext, ContextProvider}