import { Modal, View, Text, Pressable } from "react-native"
import FontAwesome from "@expo/vector-icons/AntDesign"

export default function HandleModal({visible, handleModal, text = 'Modal called'}) {
    return (
        <Modal
            visible={visible}
            animationType="fade"
        >
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome name="check" style={{color: 'white', backgroundColor: 'orange', borderRadius: 100, padding: 20}} size={100} />
                <Text style={{color: 'black', fontSize: 18, marginVertical: 10, fontWeight: 'bold'}} >{text}</Text>
                <Pressable onPress={handleModal} style={{padding: 13, backgroundColor: 'red', borderRadius: 5}} android_ripple={{color: 'grey'}}>
                    <Text style={{color: 'white'}}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    )
}