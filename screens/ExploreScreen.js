import { View, Text, Dimensions, StyleSheet, Image, Pressable, FlatList } from "react-native"
import TopNav from "../components/TopNav"
import { allData, nikeData, jordanData, addidasData } from "../data"
import { useState, useEffect } from "react"
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

    // For the Select section
    const [selectedItem, setSelectedItem] = useState('')

    // useEffect to handle changing selected filter state
    useEffect(() => {
        if(selectedItem == 'nike') {
            setFilterData(nikeData)
        } else if (selectedItem == 'jordans') {
            setFilterData(jordanData)
        } else if (selectedItem == 'adidas') {
            setFilterData(addidasData)
        }
    },[selectedItem])

    const renderData = ({item}) => {
        const {smallView = {}} = item
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Pressable
                style={({pressed}) => 
                    pressed ? 
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth, transform: [{scale: 1.1}]} :
                    {...styles.containerItem, backgroundColor: item.mainColor , width: containerWidth}}
                onPress={() => navigation.navigate('shoe', {id: item.key, type: item.type})}
            >
                <Image 
                    source={item.image}
                    style={{height: imageSize, width: imageSize, transform: [{rotateZ: "-20deg"}], resizeMode: 'contain', ...smallView}}
                />
                <Text style={{textAlign: 'left', color: 'white', fontStyle: 'italic'}}>{item.name}</Text>
            </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.ExploreScreen}>
            <TopNav navigation={navigation}/>
            <View style={{paddingHorizontal: 10}}>
                <View style={{alignItems: 'flex-end', zIndex:999, marginTop: 10}}>
                    <Select
                        data={data}
                        onSelect={value => setSelectedItem(value)}
                        value={selectedItem}
                        placeholder="Filter..."
                        zIndex={999} // for ios
                    />
                </View>
                <View style={styles.screen_content}>
                    <View style={styles.container}>
                        <FlatList 
                            data={filterData}
                            renderItem={renderData}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    ExploreScreen: {
        flex: 1,
        paddingBottom: 220
    },
    screen_content: {
        // padding: 10, reset
    },
    container: {
        marginTop: 11,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingBottom: 85
    },
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 50,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    }
})