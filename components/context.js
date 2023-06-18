import React from "react";
import { useState } from "react";
import { allData } from "../data";

const appContext = React.createContext()

function ContextProvider(props) {
    const [isFocused, setIsFocused] = useState(false)
    const [currentScreen, setCurrentScreen] = useState('home')
    const [cart, setCart] = useState ([])

    function updateCart(ID) {
        const getShoeData = allData.filter(item => item.key == ID)
        setCart(prevState => (
                [...prevState, {
                    key: getShoeData[0].key,
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

    function deleteCartItem(key) {
        setCart((prevState) => {
            const newState = prevState.filter(item => item.key !== key)
            return newState
        })
    }

    function clearCart() {
        setCart([])
    }

    function updateIsFocused(newVal) {
        setIsFocused(newVal)
    }

    function updateState(newValue) {
        setCurrentScreen(newValue)
    }

    return (
        <appContext.Provider value={{currentScreen, updateState, isFocused, updateIsFocused, cart, updateCart, deleteCartItem, clearCart}}>
            {props.children}
        </appContext.Provider>
    )
}

export {appContext, ContextProvider}