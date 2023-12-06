import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import Header from '../../components/Header'
import { FONTS, SIZES } from '../../constants'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { getUserOrders_URL } from '../../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OrderList = () => {
    const dummyData = [
        {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
        },
        {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
        },
        {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
        },
        {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
        },

        // Add more dummy data as needed
    ]

    const [allOrders, setOrdersList] = useState([])
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const getUserId = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')

                // Check if the value is present
                if (userid !== null) {
                    setUserId(userid)
                    console.log('User ID:', userid)
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
        const request_body = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        async function getUserOrders() {
            try {
                const res = await axios.post(
                    `${getUserOrders_URL}`,
                    request_body,
                    {
                        headers: headers,
                    }
                )

                setOrdersList(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        getUserOrders()
    }, [userId])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.cardContainer}>
                    <Header title="Order List" />
                    {allOrders.map((item, index) => (
                        <View style={styles.card} key={index}>
                            <View style={styles.cardRow}>
                                <Text style={styles.orderNo}>
                                    Order No: {item.orderNo}
                                </Text>
                                <Text style={styles.date}>
                                    Date:{' '}
                                    {new Date(
                                        item.orderDate
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}
                                </Text>
                            </View>
                            <View style={styles.cardRow}>
                                <Text style={styles.total}>
                                    Total: {item.total}
                                </Text>
                                <View style={styles.ratingsContainer}>
                                    <Text style={styles.ratings}>
                                        Ratings:{' '}
                                    </Text>
                                    {Array.from({
                                        length: Math.floor(item.ratings),
                                    }).map((_, i) => (
                                        <MaterialCommunityIcons
                                            key={i}
                                            name="star"
                                            size={20}
                                            color="black"
                                            style={styles.starIcon}
                                        />
                                    ))}
                                </View>
                            </View>
                            <View style={styles.horizontalLine} />
                            <View style={styles.cardRow}>
                                <Text style={styles.orderStatus}>
                                    Order Status: {item.status}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: 'regular',
    },
    cardContainer: {
        flex: 1,
        padding: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        padding: 16,
        marginTop: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderNo: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'regular',
    },
    date: {
        fontSize: 16,
        fontFamily: 'regular',
    },
    total: {
        fontSize: 16,
        fontFamily: 'regular',
    },
    ratings: {
        fontSize: 16,
        fontFamily: 'regular',
    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    orderStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'regular',
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginLeft: 5,
    },
})

export default OrderList
