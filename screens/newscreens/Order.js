import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
    Button,
    StyleSheet,
} from 'react-native'
import {
    Feather,
    Ionicons,
    MaterialIcons,
    Octicons,
    Fontisto,
} from '@expo/vector-icons'
import { CheckBox, Input } from 'react-native-elements'

import shop1 from '../../assets/images/shops/shop7.jpg'
import { images } from '../../constants/images'
import { FONTS, SIZES } from '../../constants'
import Toast from 'react-native-toast-message'
// import { SafeAreaView } from 'react-native-safe-area-context'

// import { ScrollView } from 'react-native-virtualized-view'

import { COLORS } from '../../constants'
import Header from '../../components/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
    addToCart_URL,
    favoriteItemPost_URL,
    getAllProducts_URL,
    getBrands_URL,
    getCategories_URL,
} from '../../constants/utils/URL'
import axios from 'axios'
import { TouchableWithoutFeedback } from 'react-native'

const Order = ({ navigation }) => {
    const [brandsModalVisible, setBrandsModalVisible] = useState(false)
    const [categoriesModalVisible, setCategoriesModalVisible] = useState(false)

    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const [searchText, setSearchText] = useState('')
    const [isCardClicked, setIsCardClicked] = useState(false)
    const [selectedCardIndex, setSelectedCardIndex] = useState(null)

    const [favoriteItems, setFavoriteItems] = useState([])

    const [selectedItem, setSelectedItem] = useState({})

    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState(0);

    // const brands = [
    //   // Define your brands data here
    //   'Dairy Products',
    //   'Frozen Products',
    //   '2M Products',
    //   'Other Products',
    //   'Amul Products',
    //   // ...
    // ];

    const data = [
        {
            id: 1,
            image: require('../../assets/images/shops/30g-urad-masala-papad.jpg'), // Use `require` for local images
            name: 'Nandini H C Milk 500 Ml',
            mrp: 30,
            price: 25,
            description: 'Product description goes here',
            category: 'string',
            brand: 'string',
            favorite: false,
        },
        {
            id: 2,
            image: require('../../assets/images/shops/amul-dairy-products.jpg'), // Use `require` for local images
            name: '2M Choco strands',
            mrp: 25,
            price: 20,
            description: 'Product description goes here',
            category: 'string',
            brand: 'string',
            favorite: true,
        },
        {
            id: 3,
            image: require('../../assets/images/shops/choco-strand.jpg'), // Use `require` for local images
            name: '2M Dark choco chips ',
            mrp: 25,
            price: 20,
            description: 'Product description goes here',
            category: 'string',
            brand: 'string',
            favorite: true,
        },
        {
            id: 3,
            image: require('../../assets/images/shops/frozen-products.jpg'), // Use `require` for local images
            name: '2M Dark choco chips ',
            mrp: 25,
            price: 20,
            description: 'Product description goes here',
            category: 'string',
            brand: 'string',
            favorite: true,
        },
        {
            id: 3,
            image: require('../../assets/images/shops/30g-urad-masala-papad.jpg'), // Use `require` for local images
            name: '2M Dark choco chips ',
            mrp: 25,
            price: 20,
            description: 'Product description goes here',
            category: 'string',
            brand: 'string',
            favorite: true,
        },

        // Add more items as needed
    ]

    useEffect(() => {
        async function getAllProducts() {
            try {
                const res = await axios.post(`${getAllProducts_URL}`)

                setAllProducts(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        getAllProducts()
    }, [])

    useEffect(() => {
        async function getCategories() {
            try {
                const res = await axios.get(`${getCategories_URL}`)

                // Extracting the 'name' property from each object in the array
                const categoriesNames = res.data.map(
                    (categories) => categories.name
                )

                // Setting the extracted names in the state
                setCategories(categoriesNames)
            } catch (e) {
                console.log(e)
            }
        }

        getCategories()
    }, [])

    useEffect(() => {
        async function getBrands() {
            try {
                const res = await axios.get(`${getBrands_URL}`)
                console.log('brands', res.data)

                // Extracting the 'name' property from each object in the array
                const brandNames = res.data.map((brand) => brand.name)

                // Setting the extracted names in the state
                setBrands(brandNames)
            } catch (e) {
                console.log(e)
            }
        }

        getBrands()
    }, [])

    const handleBrandSelection = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((item) => item !== brand))
        } else {
            setSelectedBrands([...selectedBrands, brand])
        }
    }

    const handleCategorySelection = (brand) => {
        if (selectedCategories.includes(brand)) {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== brand)
            )
        } else {
            setSelectedCategories([...selectedCategories, brand])
        }
    }

    const handleFavoriteItem = (item) => {
        setIsCardClicked(!isCardClicked)
        setCartModalVisible(false)
        setSelectedCardIndex(item.id)

        const object = {
            item_id: item.id,
            clicked_status: true,
        }

        const existingItemIndex = favoriteItems.findIndex(
            (item) => item.item_id === object.item_id
        )

        if (existingItemIndex !== -1) {
            // If the item exists, toggle the clicked_status
            const updatedItems = [...favoriteItems]
            updatedItems[existingItemIndex].clicked_status =
                !updatedItems[existingItemIndex].clicked_status
            setFavoriteItems(updatedItems)
        } else {
            // If the item does not exist, add it with clicked_status as true
            setFavoriteItems((prevArray) => [...prevArray, object])
        }

        console.log(favoriteItems)

        const itemIdsArray = favoriteItems.map((item) => item.item_id)

        console.log(itemIdsArray)

        const response = fetch(`${favoriteItemPost_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: '1',
                productIds: [itemIdsArray],
            }),
        })

        if (response.ok) {
            const responseData = response.json()
            console.log('API response:', responseData)
            // Handle successful signup, e.g., navigate to the login screen
        } else {
            // throw new Error('Signin failed')
        }
    }
    const handleOpenCartModal = (item) => {
        setIsCardClicked(!isCardClicked)
        setCartModalVisible(true)
        setSelectedCardIndex(item.id)

        setSelectedItem(item)

        console.log(selectedItem)
    }

    const handleCardModal = async () => {
      setCartItems((prevItems) => prevItems + 1);
        setCartModalVisible(false)
        Toast.show({
            position: 'bottom',
            text1: 'Added to cart',
            text1Style: { color: 'white', backgroundColor: 'black' },
            type: 'info',
        })

        // try {
        //   // setIsLoading(true)

        //       const response = await fetch(`${addToCart_URL}`, {
        //           method: 'POST',
        //           headers: {
        //               'Content-Type': 'application/json',
        //           },
        //           body: JSON.stringify({
        //             userId: "string",
        //             "orderDate": "2023-11-29T11:19:45.292Z",
        //             "items": [
        //               {
        //                 "productId": "string",
        //                 "quantity": 0,
        //                 "price": 0
        //               }
        //             ],
        //             "status": "PENDING",
        //             "total": 0,
        //             "deliveryType": "string",
        //             "addressId": "string"
        //           }),
        //       })

        //       if (response.ok) {
        //           const responseData = await response.json()
        //           console.log('API response:', responseData)
        //           // Handle successful signup, e.g., navigate to the login screen
        //           navigation.navigate('LocationAccess')
        //       } else {
        //         // throw new Error('Signin failed')

        //       }
        //       navigation.navigate('LocationAccess')
        //   } catch (error) {
        //       console.error('Error during signin:', error)
        //       // Handle error, e.g., display an error message to the user
        //   } finally {
        //       // setIsLoading(false)
        //   }
    }
    // function handleCardModal() {

    //   // alert("Added to cart")
    // }
    const closeModal = () => {
        setCartModalVisible(false)
    }
    const closeBrandsModal = () => {
        setBrandsModalVisible(false)
    }
    const closeCategoriesModal = () => {
        setCategoriesModalVisible(false)
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                fontFamily: 'regular',
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 16,
                    ...FONTS.body4,

                    marginVertical: SIZES.padding * 2,
                    textAlign: 'center',
                }}
            >
                <Header title="Products" />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    ></View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 22.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.tertiaryBlack,
                        }}
                    >
                        <View>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: -16,
                                    left: 12,
                                    backgroundColor: COLORS.primary,
                                    height: 25,
                                    width: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 12.5,
                                    zIndex: 999,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLORS.white,
                                    }}
                                >
                                    {cartItems}
                                </Text>
                            </View>
                            <Feather
                                name="shopping-cart"
                                size={24}
                                color={COLORS.white}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setCategoriesModalVisible(true)}
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
                            style={[
                                styles.text,
                                { color: 'white', marginRight: 5 },
                            ]}
                        >
                            Categories
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setBrandsModalVisible(true)}
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
                            style={[
                                styles.text,
                                { color: 'white', marginRight: 3 },
                            ]}
                        >
                            Brands
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                {/* Category Modal */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={categoriesModalVisible}
                    onRequestClose={closeCategoriesModal}
                >
                    <TouchableWithoutFeedback onPress={closeCategoriesModal}>
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
                                    width: 300, // Set the desired width
                                    height: 300, // Set the desired height
                                    backgroundColor: 'white',
                                    padding: 16,
                                    borderRadius: 10,
                                    position: 'absolute', // Use position 'absolute'
                                }}
                            >
                                {selectedCategories.length > 0 && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {selectedCategories.map(
                                            (categories) => (
                                                <Text
                                                    key={categories}
                                                    style={{
                                                        margin: 5,
                                                        padding: 5,
                                                        backgroundColor:
                                                            COLORS.primary,
                                                        color: 'white',
                                                    }}
                                                >
                                                    {categories}
                                                </Text>
                                            )
                                        )}
                                    </View>
                                )}
                                {/* <ScrollView>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => handleBrandSelection(brand)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{selectedBrands.includes(brand) ? '\u2713' : ' '}</Text>
                    <Text>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView> */}

                                <ScrollView>
                                    {categories.map((categories) => (
                                        <TouchableOpacity
                                            key={categories}
                                            onPress={() =>
                                                handleCategorySelection(
                                                    categories
                                                )
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckBox
                                                checked={selectedCategories.includes(
                                                    categories
                                                )}
                                                onPress={() =>
                                                    handleCategorySelection(
                                                        categories
                                                    )
                                                }
                                            />
                                            <Text style={styles.text}>
                                                {categories}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setCategoriesModalVisible(false)
                                        }
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                marginLeft: 100,
                                                fontSize: 20,
                                            }}
                                        >
                                            NO
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setCategoriesModalVisible(false)
                                        }
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                marginLeft: 10,
                                                fontSize: 20,
                                            }}
                                        >
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Brands Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={brandsModalVisible}
                    onRequestClose={closeBrandsModal}
                >
                    <TouchableWithoutFeedback onPress={closeBrandsModal}>
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
                                    width: 300, // Set the desired width
                                    height: 300, // Set the desired height
                                    backgroundColor: 'white',
                                    padding: 16,
                                    borderRadius: 10,
                                    position: 'absolute', // Use position 'absolute'
                                }}
                            >
                                {selectedBrands.length > 0 && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {selectedBrands.map((brand) => (
                                            <Text
                                                key={brand}
                                                style={{
                                                    margin: 5,
                                                    padding: 5,
                                                    backgroundColor:
                                                        COLORS.primary,
                                                    color: 'white',
                                                }}
                                            >
                                                {brand}
                                            </Text>
                                        ))}
                                    </View>
                                )}
                                {/* <ScrollView>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => handleBrandSelection(brand)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{selectedBrands.includes(brand) ? '\u2713' : ' '}</Text>
                    <Text>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView> */}

                                <ScrollView>
                                    {brands.map((brand) => (
                                        <TouchableOpacity
                                            key={brand.id}
                                            onPress={() =>
                                                handleBrandSelection(brand)
                                            }
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckBox
                                                checked={selectedBrands.includes(
                                                    brand
                                                )}
                                                onPress={() =>
                                                    handleBrandSelection(brand)
                                                }
                                            />
                                            <Text style={styles.text}>
                                                {brand}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setBrandsModalVisible(false)
                                        }
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                marginLeft: 100,
                                                fontSize: 20,
                                            }}
                                        >
                                            NO
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setBrandsModalVisible(false)
                                        }
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                marginLeft: 10,
                                                fontSize: 20,
                                            }}
                                        >
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Search Bar */}
                <View style={{ backgroundColor: 'white', padding: 5 }}>
                    <TextInput
                        placeholder="Search..."
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                </View>

                {/* Cards */}
                <ScrollView>
                    {data.map((item, index) => (
                        <View
                            style={{
                                marginTop: 5,
                                backgroundColor: 'white',
                                padding: 16,
                                borderRadius: 10,
                                marginBottom: 16,

                              //  elevation: isCardClicked ? 5 : 0, // Remove shadow when card is clicked
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleOpenCartModal(item)}
                                >
                                    <Image
                                        source={item.image}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 30,
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleOpenCartModal(item)}
                                >
                                    <Text style={{ fontSize: 18 }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'black',
                                    marginTop: -10,
                                    marginLeft: 80,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                }}
                            >
                                <Text style={{ fontWeight: 'bold' }}>
                                    MRP: ₹{' '}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Price: ₹ {item.price}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleFavoriteItem(item)}
                                    style={{ marginLeft: 100 }}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            favoriteItems.find(
                                                (favItem) =>
                                                    favItem.item_id === item.id
                                            )?.clicked_status
                                                ? 'heart'
                                                : 'heart-outline'
                                        }
                                        size={20}
                                        color="red"
                                        // name={favoriteItems.===item.id ? "heart" : "heart-outline"} size={20} color="red"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={cartModalVisible}
                    onRequestClose={closeModal}
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
                                    width: 300,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'regular',
                                        }}
                                    >
                                        {selectedItem.name}
                                    </Text>

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
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 10 }}>
                      <Text style={[styles.text,{fontWeight:'bold'}]}>MRP</Text>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                      <Text style={[styles.text,{fontWeight:'bold'}]}>{selectedItem.mrp}</Text>
                    </View>
                  </View> */}

                                        {/* First row of dynamic content */}
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
                                                    padding: 10,
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        { fontWeight: 'bold' },
                                                    ]}
                                                >
                                                    Price
                                                </Text>
                                            </View>
                                            <View
                                                style={{ flex: 1, padding: 5 }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.text,
                                                        { fontWeight: 'bold' },
                                                    ]}
                                                >
                                                    {selectedItem.price}
                                                </Text>
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
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.text,
                                                    { fontWeight: 'bold' },
                                                ]}
                                            >
                                                Qty
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: 'black',
                                                    borderRadius: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 5,
                                                }}
                                            >
                                                <Text>1</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text
                                        style={[
                                            {
                                                marginLeft: 90,
                                                fontWeight: 'bold',
                                                ...styles.text,
                                            },
                                        ]}
                                    >
                                        Total :₹ 405
                                    </Text>
                                    <TouchableOpacity
                                        onPress={handleCardModal}
                                        style={{
                                            backgroundColor: COLORS.primary,
                                            padding: 10,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            ADD TO CART
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'regular',
        fontSize: 16,
    },
})
export default Order
