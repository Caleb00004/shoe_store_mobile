import React from "react";
import { useState } from "react";
import { allData } from "../data";

const appContext = React.createContext()

function ContextProvider(props) {
    const [currentScreen, setCurrentScreen] = useState('home')
    const [cart, setCart] = useState ([])

    function updateCart(ID) {
        const getShoeData = allData.filter(item => item.key == ID)
        setCart(prevState => (
                [...prevState, {
                    item: {
                        name: getShoeData[0].name,
                        type: getShoeData[0].type,
                        image: getShoeData[0].image
                    },
                    quantity: 1}
                ]
            ))
        console.log(cart)
    }

    function updateState(newValue) {
        setCurrentScreen(newValue)
    }

    return (
        <appContext.Provider value={{currentScreen, updateState, cart, updateCart}}>
            {props.children}
        </appContext.Provider>
    )
}

export {appContext, ContextProvider}