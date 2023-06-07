import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import MenuSvg from '../assets/nav_icons/menu.svg'
import ProfileSvg from '../assets/nav_icons/profile.svg'

export default function TopNav({navigation}) {
    return (
        <View style={style.nav}>
            <Pressable onPress={() => navigation.popToTop()}>
                <MenuSvg 
                    width="50"
                    height="50"
                />
            </Pressable>

            <ProfileSvg 
                width="50"
                height="50"            
            />
            {/* <Image source={require('../assets/nav_icons/profile.svg')}/> */}
        </View>
    )
}

const style = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        // position: 'absolute',
        // top: 0,
        backgroundColor: 'white',
        width: '100%',
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        justifyContent:'space-between'
    }
})