import { useState, useRef, useContext } from "react"; 
import { Button, View, Text, Pressable , Image , StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign, FontAwesome, EvilIcons, Ionicons } from '@expo/vector-icons';
import { appContext } from "../components/context";
import HandleModal from "../components/Modal";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from 'react-native-reanimated'
import Modal from 'react-native-modal'


export default function OrderScreen({navigation}) {
    // const myCart = [{item: 'Jordans 41', key: 2}, {item: 'Jordans 41', key: 5}, {item: 'Jordans 41', key: 1}]
    // const [cartData, setCartData] = useState(myCart)
    const {cart, deleteCartItem, clearCart} = useContext(appContext)
    const [modalVisible, setModalVisible] = useState(false)
    const [displaySmallModal, setDisplaySmallModal] = useState(false)
    const sheetRef = useRef(null)
    const fall = new Animated.Value(1)
    const isDisabled = cart.length == 0

    function handleModal() {
        setModalVisible(prev => !prev)
    }

    // Bottom Sheet Content
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
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Order Confirmation</Text>
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

                <Pressable onPress={() => (handleModal(), clearCart(), sheetRef.current.snapTo(1))} android_ripple={{color: 'grey'}} style={{alignItems: 'center', padding: 8, backgroundColor: 'orange', borderRadius: 5, width: '50%'}}>
                    <Text style={{color: 'white'}}>PLACE ORDER</Text>
                </Pressable>
            </View>
        </View>
    )
            
    // Rendering Cart Data
    const renderCart = (({item}) => {
        return (
            <Pressable style={styles.cartItem}>
                <View style={styles.ItemDetails}>
                    <Image source={item.item.image} style={{marginRight: 5, width: 85, height: 85, resizeMode: 'contain', transform:[{rotateZ: "-20deg"}]}} />
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
            </Pressable>
        )
    })
    
    const onClose = (dataKey, rowMap) => {
        if(rowMap[dataKey]) { // To check the if the item to close is present in the data list
            rowMap[dataKey].closeRow()
        }
    }

    const onDelete = (data) => {
        // console.log('ONDELETE')
        console.log(data.key)
        deleteCartItem(data.key)
    }

    return (
        <View style={styles.OrderScreen}>
            {/* Small Modal */}
            <Modal isVisible={displaySmallModal} >
                <View style={{ backgroundColor: 'white', height: 120, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>Clear Cart</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Pressable 
                            android_ripple={{color: 'grey'}}
                            style={{marginRight: 5, backgroundColor: 'red', paddingHorizontal: 15, paddingVertical: 5, marginTop: 7}}
                            onPress={() => ( clearCart(), setDisplaySmallModal(false))}
                        >
                            <Text style={{color: 'white'}}>CLEAR</Text>
                        </Pressable>
                        <Pressable 
                            android_ripple={{color: 'black'}}
                            style={{marginLeft: 5, backgroundColor: 'blue', paddingHorizontal: 15, paddingVertical: 5, marginTop: 7}}
                            onPress={() => setDisplaySmallModal(false)}
                        >
                            <Text style={{color: 'white'}}>CLOSE</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* END Small Modal */}

            <HandleModal visible={modalVisible} handleModal={handleModal} text={'Order Placed'}/>

            <View style={styles.screen_content}>
                <View style={{paddingBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Your Order</Text>
                    <Text style={{fontStyle:'italic', color: 'grey'}}> {'<<'} Swipe To Delete</Text>
                </View>
                {/* IF CART IS EMPTY */}
                {isDisabled && (
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Ionicons name="cart-outline" size={120} color="black" />
                        <Text style={{fontSize: 15, color: 'grey'}}>There Is No Item Here</Text>
                        <Pressable android_ripple={{color: 'grey'}} onPress={() => navigation.navigate('Explore')} style={{marginTop: 17, backgroundColor: 'orange', padding: 6, borderRadius: 5}}>
                            <Text style={{fontSize: 18, fontWeight: '300', color: 'white'}}>Shop Now</Text>
                        </Pressable>
                    </View>
                )}


                <SwipeListView 
                    data={cart}
                    renderItem={renderCart}
                    renderHiddenItem={ (data, rowMap) =>{ 
                        return (
                            <View style={styles.rowBack}>
                                <Pressable onPress={() => onDelete(data.item)} style={{...styles.hiddenItem, backgroundColor: 'red'}} android_ripple={{color: 'grey'}}>
                                    <Text style={{color: 'white'}}>Delete</Text>
                                </Pressable>
                                <Pressable style={{...styles.hiddenItem, backgroundColor: 'orange'}} onPress={() => onClose(data.item.key, rowMap)} android_ripple={{color: 'grey'}}>
                                    <Text style={{color: 'white'}}>Close</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    leftOpenValue={0}
                    rightOpenValue={-140}
                    disableRightSwipe
                />

                <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Pressable
                        // style={({disabled}) => {}}
                        style={{backgroundColor: isDisabled ? 'gray' : 'orange', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 30, opacity: isDisabled ? 0.6 : 1}}
                        android_ripple={{backgroundColor: 'grey'}}
                        onPress={() => sheetRef.current.snapTo(0)}
                        disabled = {isDisabled}
                    >
                        <Text style={{color: 'white'}}>CHECKOUT</Text>
                    </Pressable>
                    {!isDisabled && 
                        <Pressable android_ripple={{color: 'grey'}} onPress={() => setDisplaySmallModal(true)}>
                            <Ionicons name="trash" size={34} color="red" />
                        </Pressable>
                    } 
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
    },
    screen_content: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 10,
        paddingBottom: 70
    },
    cartItem: {
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