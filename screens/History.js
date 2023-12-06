import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import { TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { orderHistory } from '../data/utils'
import Header from '../components/Header'
import { getUserOrders_URL, placeOrder_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableWithoutFeedback } from 'react-native'

const History = ({ navigation }) => {


    const [historyItems,setHistoryItems]=useState([]);
    const [cartModalVisible, setCartModalVisible] = useState(false)

    const orders = []
    const [userId, setUserId] = useState('')

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
        async function getItems() {
            try {
                const res = await axios.post(`${getUserOrders_URL}`,request_body)

                const formattedData = res.data.map(order => ({
                    ...order,
                    items: order.items.map(item => JSON.stringify(item)),
                }));
    
                setHistoryItems(formattedData);
                console.log(formattedData);
            } catch (e) {
                console.log(e)
            }
        }

        getItems()
    }, [userId])

    async function placeOrder(product) {

        const order = {
            "productId": product.productId,
            "quantity": product.quantity,
            "price": product.price
        };
    
        orders.push(product); // Push the order object into the orders array
    

        const request_body = {
            userId: userId,
            orderDate: '2023-12-04T08:45:37.872Z',
            items: orders,
            status: 'PENDING',
            total: 0,
            deliveryType: 'test',
            addressId: 'test',
        }

        // console.log(request_body)
        // // console.log(request_body)
        try {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(
                `${placeOrder_URL}`,
                request_body, // Move request_body to the data property
                {
                    headers: headers,
                }
            )

            setCartModalVisible(true)

            if (res.data) {
                console.log('API response:', res.data)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
        }
    }

    const closeModal = () => {
        setCartModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Orders History" />
                <FlatList
                    data={historyItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View style={styles.orderContainer}>
                            <Text style={styles.orderIdText}>Order ID: #{item.id}</Text>
                            <Text style={styles.orderDateText}>Order Date: {new Date(item.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}</Text>
                            <View style={styles.productsContainer}>
                                {item.items.map((product, productIndex) => {
                                const productDetails = JSON.parse(product);
                                return (
                                    <>
                                    <View key={productIndex} style={styles.productCard}>
                                        <Text style={styles.priceText}>Product ID: {productDetails.productId}</Text>
                                        <Text style={styles.priceText}>Quantity: {productDetails.quantity}</Text>
                                        <Text style={styles.priceText}>Price: {productDetails.price}</Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.rateButton} onPress={() =>
                                                navigation.navigate('AddReviews')
                                            }>
                                        <Text style={styles.rateButtonText}>Rate</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.reorderButton} onPress={()=>placeOrder(productDetails)}>
                                        <Text style={styles.reorderButtonText}>Buy Again</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </>
                                    
                                );
                                })}
                            </View>
                            <Text style={[
                                        styles.statusText,
                                        item.status === 'Completed'
                                            ? styles.completedStatus
                                            : styles.pendingStatus,
                                    ]}>Order Status: {item.status}</Text>
                            
                        </View>
                    )}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={cartModalVisible}
            >
                 <TouchableWithoutFeedback onPress={closeModal}>
                 <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 16,
                            borderRadius: 10,
                            width: 310,
                            borderWidth: 1,
                            borderColor: 'black',
                        }}
                    >
                        <View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={styles.text}>Thanks</Text>

                                <Text style={styles.text}>
                                    Your oder placed suucessfully
                                </Text>
                            </View>

                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 5,
                                    marginTop: 10,
                                    padding: 1,
                                }}
                            >
                                {/* Table header */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'black',
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            borderRightWidth: 1,
                                            borderRightColor: 'black',
                                            padding: 3,
                                        }}
                                    >
                                        <Text style={styles.text}>
                                            Goods Cost
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹2371</Text>
                                    </View>
                                </View>

                                {/* First row of dynamic content */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            borderRightWidth: 1,
                                            borderRightColor: 'black',
                                            padding: 3,
                                        }}
                                    >
                                        <Text style={styles.text}>
                                            Delivery Charges
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹07</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomColor: 'black',
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            borderRightWidth: 1,
                                            borderRightColor: 'black',
                                            padding: 3,
                                        }}
                                    >
                                        <Text style={styles.text}>Total</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹2371</Text>
                                    </View>
                                </View>

                                {/* Add more rows as needed */}
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderRadius: 5,
                                    padding: 10,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={styles.text}>Delivery:</Text>
                                </View>

                                <Text style={styles.text}>
                                    In the next delivery schedule
                                </Text>
                            </View>
                            <TextInput
                                style={{
                                    height: 55, // Adjust the height as needed
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    backgroundColor: COLORS.primary,
                                    padding: 5,
                                }}
                                placeholder="Type here for enquiry"
                                multiline={true} // Enable multi-line input
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('PaymentMethod')
                                    }
                                    style={{
                                        width: '40%',
                                        backgroundColor: COLORS.primary,
                                        padding: 10,
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'black',
                                            marginRight: 5,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PAY NOW
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        width: '40%',
                                        backgroundColor: '#E7901B',
                                        padding: 10,
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10,
                                    }}
                                    onPress={() => setCartModalVisible(false)}
                                >
                                    <Text
                                        style={{
                                            color: 'black',
                                            marginRight: 5,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        PAY LATER
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                 </TouchableWithoutFeedback>
               
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    orderContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 8,
        elevation: 3,
      },
      orderIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      orderDateText: {
        fontSize: 14,
        marginBottom: 5,
      },
      productsContainer: {
        marginTop: 10,
      },
      productCard: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
      },
      productDetailsText: {
        fontSize: 14,
        marginBottom: 5,
      },
      orderStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
      },
    //   buttonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //   },

      
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    itemContainer: {
        flexDirection: 'column',
    },
    borderBottom: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: 1,
        marginVertical: 12,
        flexDirection: 'row',
        paddingBottom: 4,
    },
    typeText: {
        fontSize: 14,
        fontFamily: 'bold',
    },
    statusText: {
        fontSize: 14,
        fontFamily: 'bold',
        marginLeft: 12,
    },
    completedStatus: {
        color: COLORS.green,
    },
    pendingStatus: {
        color: COLORS.red,
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
        fontFamily: 'regular',
    },

    orderIdText: {
        fontSize: 14,
        fontFamily: 'bold',
    },
    orderDateText: {
        fontSize: 14,
        fontFamily: 'regular',
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'regular',
        marginHorizontal: 2,
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
    rateButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    reorderButton: {
        height: 38,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'regular',
    },
    rateButtonText: {
        color: COLORS.primary,
        fontFamily: 'regular',
    },
    reorderButtonText: {
        color: COLORS.white,
        fontFamily: 'regular',
    },
})
export default History