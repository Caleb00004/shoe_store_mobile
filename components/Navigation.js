import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { appContext } from "./context";
import { useContext } from "react";

export default function Navigation({navigation }) {
    console.log('NAVIGATION')
    const {currentScreen, updateState}= useContext(appContext)
    console.log(currentScreen)

    const check = ''
    return (
        <View style={style.nav}>
            <Pressable 
                onPress={() => (updateState('home'), navigation.push('display'))}
                style={currentScreen == 'home' ? [style.outerCurrent, {paddingHorizontal: 4}] : {paddingHorizontal: 4}}
                android_ripple={{color: 'grey'}}
            >   
                <View style={currentScreen == 'home' &&  style.container}>
                    <Feather name="home" size={currentScreen == 'home' ? 40 : 25} color={currentScreen == 'home' ? 'white' : 'gray'} />
                </View>
            </Pressable>
            {/* <Pressable style={({pressed}) => pressed && {transform: [{scale: 1.3}], backgroundColor: 'red'}}> */}
            <Pressable 
                onPress={() => (updateState('explore'), navigation.push('Explore'))} 
                style={currentScreen == 'explore' ? [style.outerCurrent, {paddingHorizontal: 4}] : {paddingHorizontal: 4}}
                android_ripple={{color: 'grey'}}
            >
                <View style={currentScreen == 'explore' &&  style.container}>
                    {/* <Feather name="home" size={currentScreen == 'home' ? 40 : 25} color={currentScreen == 'home' ? 'white' : 'gray'} /> */}
                    <AntDesign name="find" size={currentScreen == 'explore' ? 40 : 25} color={currentScreen == 'explore' ? 'white' : 'gray'}/>
                </View>
            </Pressable>
            <Pressable 
                android_ripple={{color: 'grey'}} // for Andriod
                style={currentScreen == 'order' ? [style.Order_outerCurrent, {paddingHorizontal: 4}] : {paddingHorizontal: 4}}
                onPress={() => (updateState('order'), navigation.push('Order'))}
            >
                <View style={currentScreen == 'order' &&  style.Order_container}>
                    <FontAwesome name="lock" size={currentScreen == 'order' ? 40 : 25} color={currentScreen == 'order' ? 'white' : 'gray'} />
                </View>
            </Pressable>
            <Pressable style={{paddingHorizontal: 4}} android_ripple={{color: 'grey'}}>
                <Ionicons name="person"  size={25} color={'gray'} />
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        // paddingTop: 8,
        justifyContent:'space-around',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {width: 10, height: -15},
        // borderTopWidth: 1,
        borderColor: 'gray'
    },
    outerCurrent: {
        bottom: 30,
        backgroundColor: 'white',
        paddingTop: '1.4%',
        // paddingBottom: '1.4%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        // borderRadius: 40
        // borderTopStartRadius: 10
        // borderRadius: 50,
        // paddingLeft: 18,
        // paddingRight: 18,
        // paddingVertical: 15
    },
    container: {
        backgroundColor: 'orange',
        paddingTop: '12%', // 10
        paddingBottom: '12%', // 10
        paddingHorizontal: 7,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        borderRadius: 50,
        // marginTop: -3
    },
    Order_outerCurrent: {
        bottom: 35,
        backgroundColor: 'white',
        paddingTop: 5,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        // borderTopStartRadius: 10
        // borderRadius: 50,
        // paddingLeft: 18,
        // paddingRight: 18,
        // paddingVertical: 15
    },
    Order_container: {
        backgroundColor: 'orange',
        paddingTop: 6, // 10
        paddingBottom: 6, // 10
        paddingLeft: 13,
        paddingRight: 13,
        borderRadius: 50,
        // marginTop: -3
    }
})