import { View, Text, TouchableOpacity, Image, FlatList, TextBase } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import * as Animatable from 'react-native-animatable'
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/cart'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
const Cart = ({ navigation }) => {
    const data = [
        {
            id: 1,
            image: require('../assets/images/shops/30g-urad-masala-papad.jpg'), // Use `require` for local images
            label: 'Nandini H C Milk 500 Ml',
            label1: 'Frozen products',
            mrp: 30,
            price: 25,
            favorite: false,
        },
        {
            id: 2,
            image: require('../assets/images/shops/amul-dairy-products.jpg'), // Use `require` for local images
            label: '2M Choco strands',
            label1: 'Frozen products',
            mrp: 25,
            price: 20,
            favorite: true,
        },
        {
            id: 3,
            image: require('../assets/images/shops/choco-strand.jpg'), // Use `require` for local images
            label: '2M Dark choco chips ',
            label1: 'Frozen products',
            mrp: 25,
            price: 20,
            favorite: true,
        }

        // Add more items as needed
    ];

    const [quantity, setQuantity] = useState(1)
    const [cartModalVisible, setCartModalVisible] = useState(false);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    return (
        <SafeAreaView
            style={{ flex: 1, }}
        >
            <StatusBar hidden={true} />
            <View style={cartStyles.header}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={commonStyles.header1Icon}
                        >
                            <Image
                                resizeMode="contain"
                                source={icons.arrowLeft}
                                style={{
                                    height: 24,
                                    width: 24,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginLeft: 12,
                                fontSize: 17,
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            Cart
                        </Text>
                    </View>

                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    borderRadius: 10,
                                    marginBottom: 16,
                                    elevation: 3, // Remove shadow when card is clicked
                                }}
                            >
                                {/* <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.image} style={{ width: 50, height: 50, marginRight: 30 }} />
                                    <Text style={styles.text}>{item.label}</Text>


                                </View> */}


                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                    <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={styles.text}>{item.label}</Text>
                                        <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.label1}</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.text}>Qty: 1</Text>
                                    <Text style={[{ marginLeft: 10, ...styles.text }]}>Total: ₹ {item.price}</Text>
                                    <TouchableOpacity style={{ marginLeft: 150, borderColor: COLORS.primary, borderWidth: 1 }}>

                                        <MaterialCommunityIcons name="delete" size={24} color={COLORS.primary} />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text style={cartStyles.body3}>Delivery Address</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditCart')}
                    >
                        <Text style={cartStyles.body3Color}>Edit</Text>
                    </TouchableOpacity>
                </View> */}
                {/* <Input
                    id="Address"
                    placeholder="2118 Thornridge Cir. Syracuse"
                    placeholderTextColor={COLORS.gray4}
                    editable={false}
                /> */}

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 16,
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={cartStyles.body3}>Total:</Text>
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: 'bold',
                                color: COLORS.black,
                                marginLeft: 12,
                            }}
                        >
                            $90
                        </Text>
                    </View>
                    {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={cartStyles.body3Color}>Breakdown</Text>
                        <View style={{ marginLeft: 2 }}>
                            <Image
                                source={icons.arrowRight}
                                style={{
                                    height: 18,
                                    width: 18,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View>
                    </View> */}
                </View>
                <Button
                    filled
                    title="Clear Cart"
                    // onPress={() => navigation.navigate('PaymentMethod')}
                    style={{ marginVertical: 2, backgroundColor: 'red' }}
                />
                <Button
                    filled
                    title="PLACE ORDER"
                    onPress={() => setCartModalVisible(true)}
                    style={{ marginVertical: 2 }}
                />
            </Animatable.View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={cartModalVisible}
            >
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
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.text} >Thanks</Text>

                                <Text style={styles.text}>Your oder placed suucessfully</Text>
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 3 }}>
                                        <Text style={styles.text}>Goods Cost</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹2371</Text>
                                    </View>
                                </View>

                                {/* First row of dynamic content */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1 }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 3 }}>
                                        <Text style={styles.text}>Delivery Charges</Text>
                                    </View>
                                    <View style={{ flex: 1, padding: 5 }}>
                                        <Text style={styles.text}>₹07</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'black' }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 3 }}>
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
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.text}>Delivery:</Text>
                                </View>


                                <Text style={styles.text}>In the next delivery schedule</Text>




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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PaymentMethod')}
                                    style={{
                                        width: '40%',
                                        backgroundColor: COLORS.primary,
                                        padding: 10,
                                        borderRadius: 15,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10
                                    }}
                                >
                                    <Text style={{ color: 'black', marginRight: 5, fontWeight: 'bold' }}>PAY NOW</Text>

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
                                        margin: 10
                                    }}
                                    onPress={() => setCartModalVisible(false)}
                                >
                                    <Text style={{ color: 'black', marginRight: 5, fontWeight: 'bold' }}>PAY LATER</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                </View>

            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'regular',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        padding: 20,
    },
})
export default Cart




// import React from 'react'
// import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const Cart = () => {
//     const data = [
//         {
//             id: 1,
//             image: require('../assets/images/shops/shop7.jpg'), // Use `require` for local images
//             label: 'Nandini H C Milk 500 Ml',
//             mrp: 30,
//             price: 25,
//             favorite: false,
//         },
//         {
//             id: 2,
//             image: require('../assets/images/shops/shop7.jpg'), // Use `require` for local images
//             label: '2M Choco strands',
//             mrp: 25,
//             price: 20,
//             favorite: true,
//         },
//         {
//           id: 3,
//           image: require('../assets/images/shops/shop7.jpg'), // Use `require` for local images
//           label: '2M Dark choco chips ',
//           mrp: 25,
//           price: 20,
//           favorite: true,
//       }

//         // Add more items as needed
//     ];
//     return (
//         <ScrollView>
//             {data.map((item, index) => (
//                 <TouchableOpacity key={index} onPress={() => handleOpenCartModal(item)}>
//                     <View
//                         style={{
//                             backgroundColor: 'white',
//                             padding: 16,
//                             borderRadius: 10,
//                             marginBottom: 16,
//                             elevation:3, // Remove shadow when card is clicked
//                         }}
//                     >
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Image source={item.image} style={{ width: 50, height: 50, marginRight: 30 }} />
//                             <Text>{item.label}</Text>
//                         </View>
//                         <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: -10, marginLeft: 80 }} />
//                         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//                             <Text>MRP: ₹ {item.mrp}</Text>
//                             <Text style={{ marginLeft: 10 }}>Price: ₹ {item.price}</Text>
//                             <TouchableOpacity  style={{ marginLeft: 100 }}>
//                                 {item.favorite ? (
//                                     <MaterialCommunityIcons name="heart" size={24} color="red" />
//                                 ) : (
//                                     <MaterialCommunityIcons name="heart" size={24} color="gray" />
//                                 )}
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             ))}




//         </ScrollView>
//     )
// }

// export default Cart