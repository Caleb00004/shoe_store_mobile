import { Text, View } from "react-native-svg"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "../screens/Home"
import GetStarted from "../screens/getStarted"
import OrderScreen from '../screens/Order';
import ShoeScreen from '../screens/Shoe';
import ExploreScreen from '../screens/ExploreScreen';
import Navigation from "./Navigation";
import TopNav from "./Navigation";
import { useState } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const MainStack = () => {

    return (
        <Stack.Navigator 
            // initialRouteName='Home'
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                animation:'slide_from_right',
            }}
        >
            <Stack.Screen 
                name='display'
                component={Home}
                options={{
                headerShown: false
                }}
            />
            <Stack.Screen 
                name='Explore'
                component={ExploreScreen}
                options={{
                headerShown: false
                }}
            />
            <Stack.Screen
                name='Order'
                component={OrderScreen}
                options={{
                headerShown: false
                }}
            />        
        </Stack.Navigator>
    )
}

// export default function BottomTabs() {
//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarStyle: {
//                     position: 'absolute',
//                     justifyContent: 'space-around',
//                     elevation: 10,
//                     borderColor: 'gray'
//                 },
//                 headerShown: false
//             }}
//         >
//             <Tab.Screen name="display" component={Home} />
//             <Tab.Screen name="Explore" component={ExploreScreen} />
//             <Tab.Screen name="Order" component={OrderScreen} />
//         </Tab.Navigator>
//     )
// }

export default function Layout({navigation}) {
    console.log('LAYOUT')

    return (
        <>
            {/* <TopNav navigation={navigation} /> */}
            <MainStack />
            <Navigation navigation={navigation} />
        </>
    )
}

