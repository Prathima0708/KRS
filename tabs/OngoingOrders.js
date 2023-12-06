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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { getUserOrders_URL, placeOrder_URL } from '../constants/utils/URL'
import axios from 'axios'

const OngoingOrders = () => {
    const navigation = useNavigation()
    const [userId, setUserId] = useState('')

    const [data,setData]=useState([]);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const userid = await AsyncStorage.getItem('userid')
                if (userid !== null) {
                    setUserId(userid)
                } else {
                    console.log('User ID not found in AsyncStorage')
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getUserId()
    }, [])

    useEffect(() => {
        const request_body={
            userId:userId
        }
        console.log(request_body)
        async function getItems() {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            try {
                const res = await axios.post(`${getUserOrders_URL}`,request_body,{
                    headers:headers
                }
                )
                // console.log('res',res.data)
                const formattedData = res.data.map(order => ({
                    ...order,
                    items: order.items.map(item => JSON.stringify(item)),
                }));
  
                setData(formattedData);
            } catch (e) {
                console.log(e)
            }
        }

        getItems()
    }, [userId])

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        {item.items.map((product, productIndex) => {
                        const productDetails = JSON.parse(product);
                        return(
                            <>
                            <View style={styles.itemContainer}>
                                <View style={styles.borderBottom}>
                                    <Text style={styles.typeText}>{item.type}</Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <View style={styles.imageContainer}>
                                        {/* // <Image
                                        //     source={item.image}
                                        //     style={styles.image}
                                        // /> */}
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.nameText}>
                                                {productDetails.productId}
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 4,
                                                }}
                                            >
                                                <Text style={styles.priceText}>
                                                    ${productDetails.price}
                                                </Text>
                                                <Text style={styles.numberOfItemsText}>
                                                    {' '}
                                                    | {productDetails.quantity} Items
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/* // <Text style={styles.receiptText}>
                                    //     {item.receipt}
                                    // </Text> */}
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
                                            // console.log('ITEMS', item.orderNumber)
                                            navigation.navigate('CancelOrders',{
                                                productDetails,
                                                orderNumber: item.orderNumber,
                                            })
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
                            </>
                        );
                    })}
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