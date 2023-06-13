import { useState, useRef } from "react";
import { Button, View, Text, Pressable , Modal, Image , StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { appContext } from "../components/context";
import OrderPlaced from "../components/OrderPlaced";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from 'react-native-reanimated'

export default function OrderScreen() {
    const {cart} = useContext(appContext)
    console.log(cart)
    const [modalVisible, setModalVisible] = useState(false)
    const myCart = [{item: 'Jordans 41', key: 2}, {item: 'Jordans 41', key: 5}, {item: 'Jordans 41', key: 1}]
    const [cartData, setCartData] = useState(myCart)

    const sheetRef = useRef(null)
    const fall = new Animated.Value(1)

    function handleModal() {
        setModalVisible(prev => !prev)
    }

    const sheetContent = () => (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            height: 280,
            position: 'absolute',
            width: '100%'
        }}
        >   
            <Pressable android_ripple={{color: 'grey'}} onPress={() => sheetRef.current.snapTo(1)} style={{ position: 'absolute', right: 15, top: 15, zIndex: 2}} >
                <AntDesign name="closecircle" size={30} color="red" />
            </Pressable>
            <View style={{marginTop: 10,  justifyContent: 'space-between', flex: 1}}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Order Confiration</Text>
                    <FontAwesome name="cc-mastercard" size={24} color="black" />
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Delivery Adreess</Text>
                    <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text>6 john doe street</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: 'gray'}}>
                        <Text>Delivery Fee:</Text>
                        <Text>20$</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text>Total: </Text>
                        <Text>1123$</Text>
                    </View>
                </View>

                <Pressable onPress={() => (handleModal(), sheetRef.current.snapTo(1))} android_ripple={{color: 'grey'}} style={{alignItems: 'center', padding: 8, backgroundColor: 'orange', borderRadius: 5, width: '50%'}}>
                    <Text style={{color: 'white'}}>PLACE ORDER</Text>
                </Pressable>

                {/* <Button 
                    onPress={() => handleModal()}
                    android_ripple={{backgroundColor: 'green'}}
                    title={`Make Order`}
                    style={{width: 30}}
                /> */}
            </View>
        </View>
    )

    const renderCart = (({item}) => {
        console.log(item)
        return (
            <Pressable style={styles.cartItem}>
                <View style={styles.ItemDetails}>
                    <Image source={item.item.image} style={{marginRight: 5, width: 85, height: 85, resizeMode: 'contain', transform:[{rotateZ: "-20deg"}]}} />
                    {/* <Text>IMGS</Text> */}
                    <View>
                        <Text style={{fontWeight: 'bold'}}>{item.item.name}</Text>
                        <Text style={{fontWeight:'300'}}>{item.item.type}</Text>
                        <Text style={{fontWeight:'300'}}>312$</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable android_ripple={{color: 'grey'}} style={{backgroundColor: 'orange', padding: 4, borderRadius: 50}}>
                        <AntDesign name="plus" size={17} color="white"/>
                    </Pressable>
                    <Text style={{paddingHorizontal: 4}}>1</Text>
                    <Pressable android_ripple={{color: 'grey'}} style={{backgroundColor: 'orange', padding: 4, borderRadius: 50}}>
                        <AntDesign name="minus" size={17} color="white" />
                    </Pressable>
                </View>
                {/* <Text style={{color: 'white'}}>{item.item}</Text> */}
            </Pressable>
        )
    })

    const onClose = (dataKey, rowMap) => {
        if(rowMap[dataKey]) { // To check the if the item to close is present in the data list
            rowMap[dataKey].closeRow()
        }
    }

    const onDelete = () => {

    }

    return (
        <View style={styles.OrderScreen}>

            <OrderPlaced visible={modalVisible} handleModal={handleModal}/>

            <View style={styles.screen_content}>
                <Text style={{paddingBottom: 20, fontWeight: "bold", fontSize: 20}}>Your Order</Text>
                <SwipeListView 
                    data={cart}
                    renderItem={renderCart}
                    renderHiddenItem={ (data, rowMap) =>{ 
                        console.log('AAA!!!')
                        console.log(data)
                        console.log('AAA!!!')
                        // console.log(rowMap)
                        return (
                            <View style={styles.rowBack}>
                                <Pressable style={{...styles.hiddenItem, backgroundColor: 'red'}}>
                                    <Text style={{color: 'white'}}>Delete</Text>
                                </Pressable>
                                <Pressable style={{...styles.hiddenItem, backgroundColor: 'orange'}} onPress={() => onClose(data.item.key, rowMap)}>
                                    <Text style={{color: 'white'}}>Close</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    leftOpenValue={0}
                    rightOpenValue={-140}
                    disableRightSwipe
                />

                <View style={{backgroundColor:'red'}}>
                    <Button 
                        android_ripple={{backgroundColor: 'grey'}}
                        onPress={() => sheetRef.current.snapTo(0)}
                        title={`Checkout`}
                        color={'orange'}
                    />
                </View>
            </View>
            <BottomSheet 
                ref={sheetRef}
                renderContent={sheetContent}
                // snapPoints={[450, 300, 0]}
                snapPoints={[330, 0]} // The bottom sheet will be visible at 330px and invisble at snap 0px
                initialSnap={1} // (From the snapPoints array) Where the Bottom sheet to be from the start i.e if you want to be open you will use 0 i.e 330 from array above / if to be closed use 1 ie at 0 form snapPoints array
                callbackNode={fall}
                enabledGestureInteraction={true}
            />                

        </View>
    )
}

const styles = StyleSheet.create({
    OrderScreen: {
        flex: 1,
        // paddingBottom: 0        
        // position: 'relative'
    },
    screen_content: {
        // opacity: 0.5,
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 10,
        paddingBottom: 70
    },
    cartItem: {
        // marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: "hidden"
    },
    ItemDetails: {
        flexDirection: 'row',
        alignItems: "center"
    },
    rowBack: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    hiddenItem: {
        // height: '100%',
        height: 44,
        justifyContent: 'center',
        paddingHorizontal: 15
    }
})