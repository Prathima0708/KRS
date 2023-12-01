import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import React from 'react'
import { orders } from '../data/utils'
import { COLORS } from '../constants'
import { useNavigation } from '@react-navigation/native'

const OngoingOrders = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.borderBottom}>
                            <Text style={styles.typeText}>{item.type}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={item.image}
                                    style={styles.image}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.nameText}>
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text style={styles.priceText}>
                                            ${item.price}
                                        </Text>
                                        <Text style={styles.numberOfItemsText}>
                                            {' '}
                                            | {item.numberOfItems} Items
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.receiptText}>
                                {item.receipt}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('TrackingOrdersV2')
                                }
                                style={styles.trackButton}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.trackButtonText,
                                    ]}
                                >
                                    Track Order
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('CancelOrders')
                                }
                                style={styles.cancelButton}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.cancelButtonText,
                                    ]}
                                >
                                    Return
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'column',
    },
    borderBottom: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginVertical: 12,
        paddingBottom: 4,
    },
    typeText: {
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.primary,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 8,
    },
    nameText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 14,
        fontFamily: 'bold',
    },
    numberOfItemsText: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    receiptText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.gray5,
        fontFamily: 'regular',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 18,
    },
    trackButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    cancelButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'regular',
    },
    cancelButtonText: {
        color: COLORS.primary,
    },
    trackButtonText: {
        color: COLORS.white,
    },
})

export default OngoingOrders