import { View, Text, Dimensions, StyleSheet, Image, Pressable, FlatList } from "react-native"
import TopNav from "../components/TopNav"
import { allData, nikeData, jordanData, addidasData } from "../data"
import { useEffect, useState } from "react"
import Select from '@redmin_delishaj/react-native-select'
const { width, height } = Dimensions.get('window')

let containerWidth = (width / 2) - 40
let imageSize = (width * 30) / 100

export default function ExploreScreen({navigation}) {

    const [filterData, setFilterData] = useState(allData)

    const data = [
        { text: 'Nikes', value: 'nike' },
        { text: 'Adidas', value: 'adidas' },
        { text: 'Jordans', value: 'jordans' },
    ];

    const [selectedItem, setSelectedItem] = useState('')

    useEffect(() => {
        if(selectedItem == 'nike') {
            setFilterData(nikeData)
        } else if (selectedItem == 'jordans') {
            setFilterData(jordanData)
        } else if (selectedItem == 'adidas') {
            setFilterData(addidasData)
        }
    },[selectedItem])

    const display = allData.map(item => {
        const {smallView = {}} = item
        return (
            <Pressable
                style={({pressed}) => 
                    pressed ? 
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth, transform: [{scale: 1.1}]} :
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth}}
                // style={{...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth}}
                onPress={() => navigation.navigate('shoe', {id: item.key, type: item.type})}
            >
                <Image 
                    source={item.image}
                    style={{height: imageSize, width: imageSize, transform: [{rotateZ: "-20deg"}], resizeMode: 'contain', ...smallView}}
                />
                <Text style={{textAlign: 'left', color: 'white', fontStyle: 'italic'}}>{item.name}</Text>
                {/* <View style={{borderTopColor: 'black', borderTopWidth: 1 }}>
                    <Text style={{textAlign: 'left', marginTop: 10}}>Name: {item.name}</Text>
                    <Text style={{textAlign: 'left'}}>Shoe: {item.type}</Text>
                </View> */}
            </Pressable>
        )
    })

    const renderData = ({item}) => {
        const {smallView = {}} = item
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Pressable
                style={({pressed}) => 
                    pressed ? 
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth, transform: [{scale: 1.1}]} :
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth}}
                // style={{...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth}}
                onPress={() => navigation.navigate('shoe', {id: item.key, type: item.type})}
            >
                <Image 
                    source={item.image}
                    style={{height: imageSize, width: imageSize, transform: [{rotateZ: "-20deg"}], resizeMode: 'contain', ...smallView}}
                />
                <Text style={{textAlign: 'left', color: 'white', fontStyle: 'italic'}}>{item.name}</Text>
                {/* <View style={{borderTopColor: 'black', borderTopWidth: 1 }}>
                    <Text style={{textAlign: 'left', marginTop: 10}}>Name: {item.name}</Text>
                    <Text style={{textAlign: 'left'}}>Shoe: {item.type}</Text>
                </View> */}
            </Pressable>
            </View>
        )
    }
    return (
        <View style={styles.ExploreScreen}>
            <TopNav />
            {/* <View style={{paddingHorizontal: 10}}>
                <FlatList 
                    data={allData}
                    renderItem={renderData}
                />
            </View> */}
            {/* <ScrollView> */}
                <View style={{paddingHorizontal: 10}}>
                    <View style={{alignItems: 'flex-end', zIndex:999, marginTop: 10}}>
                        {/* <Text style={{fontSize: 20, marginVertical:10, fontWeight:'300'}}>Filter</Text> */}
                        <Select
                            data={data}
                            onSelect={value => setSelectedItem(value)}
                            value={selectedItem}
                            placeholder="Filter..."
                            zIndex={999} // for ios
                        />
                    </View>
                    {/* <View style={{backgroundColor: 'grey', width: 170, marginLeft: 'auto', padding: 10}}>
                        <Text style={{color: 'white'}}>Filter Section</Text>
                    </View> */}
                    <View style={styles.screen_content}>
                        {/* <Text>This The Explore Screen</Text> */ }
                        {/* <Navigation navigation={navigation} /> */ }
                        <View style={styles.container}>
                            <FlatList 
                                data={filterData}
                                renderItem={renderData}
                                // style={{flexDirection: 'row', flexWrap:'nowrap', backgroundColor: 'blue'}}
                            />
                        </View>
                    </View>
                </View>
            {/* </ScrollView> */}
        </View>
    )
}


const styles = StyleSheet.create({
    ExploreScreen: {
        flex: 1,
        // paddingHorizontal: 10,
        paddingBottom: 220
    },
    screen_content: {
        // padding: 10, reset
    },
    container: {
        marginTop: 11,
        // backgroundColor: 'red',
        flexDirection: 'row',
        // paddingLeft: 'auto',
        // paddingRight: 'auto',
        // flex: 1,
        flexWrap: 'nowrap',
        paddingBottom: 85
        // justifyContent:'space-around'
    },
    containerItem: {
        flex: 1,
        // width: 150,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 50,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    }
})