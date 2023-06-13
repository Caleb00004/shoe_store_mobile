import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import TopNav from "../components/TopNav";
import ShoeSvg from '../assets/ShoeTest.svg'
import OrderPlaced from "../components/OrderPlaced";
import { useContext } from "react";
import { appContext } from "../components/context";
import { useState } from "react";
import {jordanData} from '../data'
import { nikeData } from "../data";
import { addidasData } from "../data";

export default function ShoeScreen({navigation, route}) {
    const [modalVisible, setModalVisible] = useState(false)
    const {id, type} = route.params
    const {updateCart} = useContext(appContext)

    function handleModal() {
        setModalVisible(prev => !prev)
    }


    const currentShoe = 
        type == 'nike' ? 
            nikeData.filter(item => item.key == id) :
        type == 'jordans' ?
            jordanData.filter(item => item.key == id) :
        addidasData.filter(item => item.key == id)

    const {image, name, mainColor, material, colorShown, extra = {}} = currentShoe[0]
    let color = mainColor

    return (
        <View style={styles.screen}>
            <TopNav navigation={navigation}/>
            
            <OrderPlaced visible={modalVisible} handleModal={handleModal}/>

            <ScrollView>
                <View style={{paddingLeft: 15}}>
                    <Text style={styles.header} >{name}</Text>
                    <Text style={{color: 'grey', marginTop: 5}}>Customised by Alex pedro</Text>
                    <View style={{...styles.imgContainer, backgroundColor: color}}>
                        <Image 
                            source={image}
                            style={{...styles.image, ...extra}}
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal: 15}}>
                    <View style={{marginTop: 70, flexDirection: 'row', marginBottom: 10}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Material: </Text>
                        <Text style={{color: 'gray', fontSize: 17}} >Textile</Text>
                    </View>
                    <Text style={{color: 'gray'}}>Color shown: {colorShown}</Text>
                    <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginVertical: 20}}>
                        <Text style={{fontWeight: 'bold'}}>Size</Text>
                        <Text style={styles.sizes}>36</Text>
                        <Text style={styles.sizes}>37</Text>
                        <Text style={styles.sizes}>38</Text>
                        <Text style={styles.sizes}>39</Text>
                        <Text style={styles.sizes}>40</Text>
                    </View>
                    <View style={styles.membership_container}>
                        <Text style={{flex: 2}}>Free Delivery with your Membership</Text>
                        <Pressable style={styles.button}>
                            <Text style={{color: 'white'}}>Membership</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <Pressable 
                style={{padding: 15, alignItems: 'center', backgroundColor: color, marginBottom: 10, marginHorizontal: 15}}
                onPress={() => (updateCart(id) , handleModal())}
            >
                <Text style={{color: 'white'}}>Add To Cart</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15
    },
    imgContainer: {
        marginTop: 80,
        width: "90%",
        paddingRight: 70,
        marginLeft: "auto",
        // backgroundColor: '#FFB301',
        // backgroundColor: color,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    image: {
        height: 380,
        width: 380,
        resizeMode: 'contain',
        // transform: [{rotateZ: "-20deg"}, {rotateY: "180deg"}] 
        transform: [{rotateZ: "-20deg"}] 
    },
    membership_container: {
        flexDirection: "row",
        alignItems: 'center',
    },
    button: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    sizes: {
        padding: 10,
        backgroundColor: '#F1F1F1',
        borderRadius: 5
    }
})