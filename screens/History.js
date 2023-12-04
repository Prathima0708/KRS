import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { orderHistory } from '../data/utils'
import Header from '../components/Header'
import { getUserOrders_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const History = ({ navigation }) => {


    const [historyItems,setHistoryItems]=useState([]);

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
                                        <TouchableOpacity style={styles.reorderButton} onPress={() => console.log('Buy Again button pressed')}>
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
    },
    reorderButtonText: {
        color: COLORS.white,
    },
})
export default History