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
    Linking
} from "react-native";
import TopNav from "../components/TopNav";
import { useRef, useState, useContext, useLayoutEffect, useEffect } from "react";
import {jordanData} from '../data'
import { nikeData } from "../data";

const { width, height } = Dimensions.get('window')
const newWidth = width - 100
const heroWidth = width - 35

export default function Home({navigation }) {
    let FlatListRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)

    // NOT NEEDED AGAIN
    const scrollToIndex = (index) => {
        // console.log('Called')
        FlatListRef.current?.scrollToIndex({animated: true, index: index})
    }

    // NOT NEEDED AGAIN
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
            <Pressable 
                style={{marginRight: 15, width: newWidth, marginTop: 10, backgroundColor: '#F1F1F1', borderRadius: 5}}
                onPress={() => navigation.navigate('shoe', {id: item.key, type: 'nike'})}
                android_ripple={{color: 'grey'}}
            >
                <View style={{...styles.shoe_item }}>
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

    const renderJordans = (({item}) => {
        return (
            <Pressable style={{marginRight: 15, width: newWidth, marginTop: 10, backgroundColor: '#F1F1F1', borderRadius: 5}} onPress={() => navigation.navigate('shoe', {id: item.key, type: 'jordans'})} android_ripple={{color: 'grey'}}>
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
            </Pressable>
        )
    })

    // scrapped off code for carousel Hero Section
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
                <ImageBackground 
                    source={item.Bg}
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
    )

    return (
        <View style={styles.home_screen} >
             <TopNav navigation={{navigation}} />
             <ScrollView style={{marginBottom: 50}}>
                <View style={styles.scree_content}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}/>
                        <View style={styles.filterIcon}>
                            <Text style={{color: 'white'}}>ICO</Text>
                        </View>
                    </View>

                    {/* HERO SECTION */}
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
                    {/* END HERO SECTION  */}

                    <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20}}>
                        {carouselItems.map((item, i) => (
                            // <Pressable key={i} style={[styles.circle, i == currentIndex ? {backgroundColor: '#dedcdc', transform: [{scaleY: 1.3}, {scaleX: 1.3}]} : {backgroundColor: 'white'}]} onPress={() => scrollToIndex(i)}>
                            <Pressable key={i} style={styles.circle}>
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

                    {/* NIKE CAROUSEL */}
                    <View style={styles.newShoes_container}>
                        <View style={styles.container_text}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Newest Nike shoes</Text>
                            <Pressable android_ripple={{color: 'grey'}} onPress={() => ( navigation.navigate('Explore'))}>
                                <Text style={{color: 'orange'}}>Show More</Text>
                            </Pressable>
                        </View>
                        <FlatList 
                            data={nikeData}
                            renderItem={renderNike}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    
                    {/* JORDANS CAROUSEL */}
                    <View style={{...styles.container_text, marginTop: 20}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>New Jordan Shoes</Text>
                        <Pressable android_ripple={{color: 'grey'}} onPress={() => ( navigation.navigate('Explore'))}>
                            <Text style={{color: 'orange'}}>Show More</Text>
                        </Pressable>
                    </View>
                    <FlatList 
                        data={jordanData}
                        renderItem={renderJordans}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                    />
                    {/* END JORDANS CAROUSEL */}
                    
                    <Pressable 
                        onPress={() => Linking.openURL('https://caleb-portfolio-00004.vercel.app/')}
                        style={{padding: 30, backgroundColor: '#F1F1F1', marginTop: 15, alignItems:'flex-start'}}
                        android_ripple={{color: 'grey'}}
                    >
                        <Text style={{fontWeight: 'bold'}}>Checkout My Portfolio</Text>
                        <Text style={{color: 'white', backgroundColor: 'orange', padding: 8, borderRadius: 5, marginTop: 5}}>Go To</Text>
                    </Pressable>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    circle: {
        borderRadius: 50,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: 'white'
    }
})
