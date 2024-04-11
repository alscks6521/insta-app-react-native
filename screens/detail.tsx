import { StyleSheet, Text, View } from "react-native"

export default() => {

    //detail screen
    return (
        <View style={detailstyles.container}>
            <Text>Detail Screen.</Text>
        </View>
    )
}

const detailstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lime',
        alignItems: 'center',
        justifyContent: 'center',
      },
});