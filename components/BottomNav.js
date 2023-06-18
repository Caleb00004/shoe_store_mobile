import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { useState } from "react";
import { useContext } from "react";
import { appContext } from "./context";

export default function BottomNav({state, descriptors, navigation}) {
    const NAME = 'Order' // This is to apply special dynamic style for the order screen bottom tab
    const {cart} = useContext(appContext)
    
    return (
    <View style={{borderTopWidth: 0.3, height: 60, borderColor: 'grey', flexDirection: 'row',  backgroundColor:'white', position:'absolute', bottom: 0, justifyContent:'space-around', alignItems:'center', width:'100%' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <Pressable 
                key={index}
                onPress={onPress}
                onLongPress={onLongPress}
                android_ripple={{color:'grey'}}
                style = {isFocused && {backgroundColor: 'white', borderColor: 'grey', padding: 5, borderRadius: 40, bottom: 30 }}
            >
                <View style={isFocused && {backgroundColor: 'orange', padding: 9, alignItems: 'center', borderRadius: 40}}>
                    {options.tabBarIcon && options.tabBarIcon}
                </View>
                {!isFocused && route.name == NAME && cart.length > 0 && <Text style={{position: 'absolute', right: -18, bottom: 17, backgroundColor: 'orange', color: 'white', paddingHorizontal: 7, paddingVertical: 1, borderRadius: 50}}>{cart.length}</Text>}
            </Pressable>
        );
      })}
    </View>

    )
}

