import { 
    ScrollView,
    View, Image,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Pressable,
    FlatList,
} from "react-native";
import Navigation from "../components/Navigation";
import NikeLogo from '../assets/Nike_images/nikeLogo2.svg'
// import AntDesign from "@expo/vector-icons/AntDesign";
import TopNav from "../components/TopNav";
import { useRef, useState, useContext } from "react";
import {jordanData} from '../data'
import { nikeData } from "../data";
import { addidasData } from "../data";
import { useIsFocused } from "@react-navigation/native";
import {FlashList} from '@shopify/flash-list'
import { appContext } from "../components/context";

const { width, height } = Dimensions.get('window')
const newWidth = width - 100
const heroWidth = width - 35

console.log('Home screen')

export default function Home({navigation }) {
    const {currentScreen, updateState}= useContext(appContext)
    let FlatListRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)

    const isFocused = useIsFocused()

    const scrollToIndex = (index) => {
        // console.log('Called')
        FlatListRef.current?.scrollToIndex({animated: true, index: index})
    }

    const onViewRef = useRef(({changed}) => {
        console.log('My Ayeni')
        if(changed[0].isViewable) {
            setCurrentIndex(changed[0].index)
        }
    })

    const carouselItems = [
        {   
            key: 0,
            Bg: require('../assets/homeBG.jpg'),
            image: require('../assets/pngwing.com.png'),
            logo: require('../assets/Nike_images/nikeLogo.png')
        },
        {
            key: 1,
            Bg: require('../assets/Jordans_images/blueBG.png'),
            image: require('../assets/Jordans_images/Jordans1.png'),
            logo: require('../assets/Jordans_images/jordanLogo.png')
        },
        {
            key: 2,
            Bg: require('../assets/Adidas_images/yellowBG.png'),
            image: require('../assets/Adidas_images/Addidas1.png'),
            logo: require('../assets/Adidas_images/adidasLogo1.png')
        }
    
    ]

    const renderNike = (({item}) => {
        return (
            <Pressable onPress={() => navigation.navigate('shoe', {id: item.key, type: 'nike'})}>
                <View style={{...styles.shoe_item, marginRight: 15, width: newWidth}}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Nike</Text>
                            <Text>{item.name}</Text>
                            <View style={{padding: 8, marginTop: 8 ,borderRadius: 5, backgroundColor: 'orange'}}>
                                <Text style={{color: 'white', fontSize: 12}}>Add To</Text>
                            </View>
                        </View>
                        <Image source={item.image} style={{width: 90, height: 90, resizeMode: 'contain', transform: [{rotateZ: '-20deg'}]}}/>
                </View>
            </Pressable>
        )
    })

    const renderAdidas = (({item}) => {
        return (
            <Pressable onPress={() => navigation.navigate('shoe', {id: item.key, type: 'adidas'})}>
                <View style={{marginRight: 15, width: newWidth}}>
                    <View style={styles.shoe_item}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Jordans</Text>
                            <Text>{item.name}</Text>
                            <Pressable style={{padding: 8, marginTop: 8 ,borderRadius: 5, backgroundColor: 'orange'}}>
                                <Text style={{color: 'white', fontSize: 12}}>Add To</Text>
                            </Pressable>
                        </View>
                        <Image source={item.image} style={{width: 90, height: 90, resizeMode: 'contain', transform: [{rotateZ: '-20deg'}]}}/>
                    </View>
                </View>   
            </Pressable>
        )
    })

    const renderJordans = (({item}) => {
        return (
            <Pressable onPress={() => navigation.navigate('shoe', {id: item.key, type: 'jordans'})}>
                <View style={{marginRight: 15, width: newWidth}}>
                    <View style={styles.shoe_item}>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Jordans</Text>
                            <Text>{item.name}</Text>
                            <Pressable style={{padding: 8, marginTop: 8 ,borderRadius: 5, backgroundColor: 'orange'}}>
                                <Text style={{color: 'white', fontSize: 12}}>Add To</Text>
                            </Pressable>
                        </View>
                        <Image source={item.image} style={{width: 90, height: 90, resizeMode: 'contain', transform: [{rotateZ: '-20deg'}]}}/>
                    </View>
                </View>   
            </Pressable>
        )
    })

    const renderItem = ({item}) => (
        <Pressable>
            <View style={styles.imageContainer}>
                <View style={{flex: 1}}>
                    <Image style={{width: 160, height: 160, resizeMode: 'contain', transform:[{rotateZ: "-20deg"}]}} source={item.image}/>
                </View>
                <View style={styles.imageText}>
                    <Text style={{color: 'white', width: '80%'}}>A work House built to help power you</Text>
                    <Pressable style={styles.explore_btn}>
                        <Text style={{fontSize: 12}}>Explore Now</Text>
                    </Pressable>
                </View>
                {/* <ImageBackground 
                    source={item.Bg}
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0.8,
                        position: 'absolute',
                        zIndex: -1,
                        borderRadius: 40
                    }}
                /> */}
            </View>
        </Pressable>
    )

    return (
        <View style={styles.home_screen} >
             {/* <AntDesign name="hearto" size={25} color={'#FCB495'} style={styles.heartIcon}/> */}
             <TopNav />
             <ScrollView style={{marginBottom: 50}}>
             <View style={styles.scree_content}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}/>
                    <View style={styles.filterIcon}>
                        <Text style={{color: 'white'}}>ICO</Text>
                    </View>
                </View>

                <Pressable>
                    <View style={styles.imageContainer}>
                        <View style={{flex: 1}}>
                            <Image style={{width: 160, height: 160, resizeMode: 'contain', transform:[{rotateZ: "-20deg"}]}} source={carouselItems[0].image}/>
                        </View>
                        <View style={styles.imageText}>
                            <Text style={{color: 'white', width: '80%'}}>A work House built to help power you</Text>
                            <Pressable style={styles.explore_btn}>
                                <Text style={{fontSize: 12}}>Explore Now</Text>
                            </Pressable>
                        </View>
                        <ImageBackground 
                            source={carouselItems[0].Bg}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: 0.8,
                                position: 'absolute',
                                zIndex: -1,
                                borderRadius: 40
                            }}
                        />
                    </View>
                </Pressable>

                {/* <FlashList 
                    data={carouselItems}
                    renderItem={renderItem}
                    estimatedItemSize={5}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    ref={(ref) => {
                        FlatListRef.current = ref
                    }}
                    // removeClippedSubviews={true}
                    // maxToRenderPerBatch={3}
                    onViewableItemsChanged={onViewRef.current}
                /> */}
                {/* <FlatList 
                    data={carouselItems}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    ref={(ref) => {
                        FlatListRef.current = ref
                    }}
                    // removeClippedSubviews={true}
                    // maxToRenderPerBatch={3}
                    onViewableItemsChanged={onViewRef.current}
                /> */}

                {/*  */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
                    {carouselItems.map((item, i) => (
                        <Pressable style={[styles.circle, i == currentIndex ? {backgroundColor: '#dedcdc', transform: [{scaleY: 1.3}, {scaleX: 1.3}]} : {backgroundColor: 'white'}]} onPress={() => scrollToIndex(i)}>
                            <Image 
                                source={item.logo}
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </Pressable>
                    ))}
                </View>
                {/* <View style={{padding: 15, marginTop: 20 , backgroundColor: 'orange'}}>
                    <Text style={{color: 'white'}} >Carousel Part</Text>
                </View> */}

                <View style={styles.newShoes_container}>
                    <View style={styles.container_text}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Newest Nike shoes</Text>
                        <Pressable android_ripple={{color: 'grey'}} onPress={() => (updateState('explore'), navigation.navigate('Explore'))}>
                            <Text style={{color: 'orange'}}>Show More</Text>
                        </Pressable>
                    </View>
                    {/* <FlashList 
                        data={nikeData}
                        renderItem={renderNike}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        estimatedItemSize={5}
                    /> */}
                    <FlatList 
                        data={nikeData}
                        renderItem={renderNike}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                
                <View style={{...styles.container_text, marginTop: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>New Jordan Shoes</Text>
                    <Pressable android_ripple={{color: 'grey'}} onPress={() => (updateState('explore'), navigation.navigate('Explore'))}>
                        <Text style={{color: 'orange'}}>Show More</Text>
                    </Pressable>
                </View>
                {/* <FlashList 
                    data={jordanData}
                    renderItem={renderJordans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={5}
                /> */}
                <FlatList 
                    data={jordanData}
                    renderItem={renderJordans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // pagingEnabled
                    // ref={(ref) => {
                    //     FlatListRef.current = ref
                    // }}
                    // onViewableItemsChanged={onViewRef.current}
                />
                
                {/* <Text>This is the Home Page</Text> */}
             </View>
             </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    home_screen: {
        backgroundColor: 'white',
        flex: 1
    },
    scree_content: {
        padding: 20
    },
    inputContainer: {
        flexDirection: "row",
    },
    input: {
        // width: '100%',
        flex: 1,
        marginRight: 20,
        borderWidth: 1,
        padding: 3,
        borderRadius: 5
    },
    filterIcon: {
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 5 
    },
    imageContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 20,
        width: heroWidth
    },
    imageText: {
        paddingLeft: 10,
        flex: 1
    },
    explore_btn: {
        backgroundColor: 'white',
        padding: 7,
        width: '60%',
        marginTop: 10,
        borderRadius: 5
    },
    newShoes_container: {
        marginTop: 20
    },
    container_text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shoe_item: {
        marginTop: 10,
        backgroundColor: '#F1F1F1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 5
    },
    circle: {
        // width: 20,
        // height: 20,
        // backgroundColor: 'grey',
        borderRadius: 50,
        marginHorizontal: 5,
        padding: 10
    }
})
