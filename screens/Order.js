import { View, Text, StyleSheet } from "react-native";

export default function OrderScreen() {
    return (
        <View style={styles.OrderScreen}>
            <View style={styles.screen_content}>
                <Text>This is the Order Screen</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    OrderScreen: {
        flex: 1
    },
    screen_content: {
        padding: 40
    }
})