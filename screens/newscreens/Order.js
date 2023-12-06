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
    getFavoritesByUserId_URL,
    getFavorites_URL,
    userCart_URL,
} from '../../constants/utils/URL'
import axios from 'axios'
import { TouchableWithoutFeedback } from 'react-native'
import { async } from 'validate.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Order = ({ navigation }) => {
    const [brandsModalVisible, setBrandsModalVisible] = useState(false)
    const [categoriesModalVisible, setCategoriesModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
    const [cartItems, setCartItems] = useState(0)

    const [userId, setUserId] = useState('')
    const [selectedProductIds, setSelectedProductIds] = useState([])
    const [matchingProductIds, setmatchingProductIds] = useState()

    const [cartCount, setCartCount] = useState(0)

    const [quantity, setQuantity] = useState('1')

    const handleQuantityChange = (newQuantity) => {
        // Validate the input to ensure it's a positive integer
        if (/^[1-9]\d*$/.test(newQuantity)) {
            setQuantity(newQuantity)
        }
    }

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
        const request_model = {
            userId: userId,
        }
        let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        async function getCartCount() {
            try {
                const res = await axios.post(`${userCart_URL}`, request_model, {
                    headers: headers,
                })

                setCartCount(res.data.length)
            } catch (e) {
                console.log(e)
            }
        }

        getCartCount()
    }, [userId])

    console.log('User ID in products screen:', userId)

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

    // async function handleFavoriteItem(item) {
    //     setIsCardClicked(!isCardClicked)
    //     setCartModalVisible(false)
    //     setSelectedCardIndex(item.id)

    //     const object = {
    //         item_id: item.id,
    //         clicked_status: true,
    //     }

    //     const existingItemIndex = favoriteItems.findIndex(
    //         (item) => item.item_id === object.item_id
    //     )

    //     if (existingItemIndex !== -1) {
    //         // If the item exists, toggle the clicked_status
    //         const updatedItems = [...favoriteItems]
    //         updatedItems[existingItemIndex].clicked_status =
    //             !updatedItems[existingItemIndex].clicked_status
    //         setFavoriteItems(updatedItems)
    //     } else {
    //         // If the item does not exist, add it with clicked_status as true
    //         setFavoriteItems((prevArray) => [...prevArray, object])
    //     }

    //     const itemIdsArray = favoriteItems.map((item) => item.item_id)
    //     const request_model={
    //         userId: userId,
    //         productIds: itemIdsArray,
    //     }
    //     console.log(itemIdsArray)
    //     console.log("REQUEST",request_model)
    //     try {
    //         setIsLoading(true)

    //         let headers = {
    //             'Content-Type': 'application/json; charset=utf-8',
    //         }

    //         const res = await axios.post(`${favoriteItemPost_URL}`,

    //         {
    //             headers:headers,
    //             data:request_model
    //         }
    //         )

    //         if (res.data) {
    //             console.log('API response:', res.data)
    //         }

    //     } catch (error) {
    //         console.log('error',error)
    //     } finally {

    //     }
    // }
    useEffect(() => {
        const getIDs = async () => {
            const request_body = {
                userId: userId,
            }

            try {
                const res = await axios.post(
                    `${getFavoritesByUserId_URL}`,
                    request_body
                )
                const favoriteProducts = res.data
                const allProductIds = res.data.reduce((acc, item) => {
                    acc.push(...item.productIds)
                    return acc
                }, [])

                const uniqueProductIds = [...new Set(allProductIds)]

                const matchingProductIds = allProducts
                    .filter((product) => uniqueProductIds.includes(product.id))
                    .map((product) => product.id)

                setmatchingProductIds(matchingProductIds)
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getIDs()
    }, [userId, allProducts])

    console.log('matching id', matchingProductIds)

    const handleFavoriteItem = async (item) => {

        const existingFavoriteProducts = favoriteItems.map(
            (favItem) => favItem.item_id
        )

        // Toggle favorite status
        const isFavorite = existingFavoriteProducts?.includes(item.id)

        // Combine existing and new product IDs
        const updatedProductIds = isFavorite
            ? existingFavoriteProducts.filter(
                  (productId) => productId !== item.id
              )
            : [...existingFavoriteProducts, item.id]

        const requestBody = {
            userId: userId,
            productIds: updatedProductIds,
        }

        try {
            const response = await fetch(
                'http://13.239.122.212:8080/api/favourites',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            )
            const res = await response.json()

            console.log("API RES",(res))

            if (response.ok) {
                // Update favoriteItems array based on the response
                const updatedFavoriteItems = updatedProductIds.map(
                    (productId) => ({
                        item_id: productId,
                        clicked_status: true,
                    })
                )

                // Update state with the new favoriteItems array
                setFavoriteItems(updatedFavoriteItems)
            } else {
                // Handle error if the response is not okay
                console.error('Failed to toggle favorite status')
            }
        } catch (error) {
            console.error('Error while making API request:', error)
        }
    }

    // const handleFavoriteItem = async (item) => {
    //     // Assuming you have userId available, replace 'yourUserId' with the actual userId

    //     // Fetch existing favorite product IDs for the user
    //     const existingFavoriteProducts = favoriteItems.map(
    //         (favItem) => favItem.item_id
    //     )
    //     console.log(existingFavoriteProducts)

    //     // Toggle favorite status
    //     const isFavorite = existingFavoriteProducts.includes(item.id)

    //     let updatedProductIds

    //     if (isFavorite) {
    //         // Remove from favorites
    //         const response = await fetch(
    //             'http://13.239.122.212:8080/api/favourites/deleteFavourite',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     // userId: userId,
    //                     id: [item.id],
    //                 }),
    //             }
    //         )

    //         if (response.ok) {
    //             // Update product IDs after removal
    //             updatedProductIds = existingFavoriteProducts.filter(
    //                 (productId) => productId !== item.id
    //             )
    //         } else {
    //             // Handle error if the delete request fails
    //             console.error('Failed to remove from favorites')
    //             return
    //         }
    //     } else {
    //         // Add to favorites
    //         const response = await fetch(
    //             'http://13.239.122.212:8080/api/favourites',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     userId: userId,
    //                     productIds: [item.id],
    //                 }),
    //             }
    //         )

    //         if (response.ok) {
    //             // Update product IDs after addition
    //             updatedProductIds = [...existingFavoriteProducts, item.id]
    //         } else {
    //             // Handle error if the post request fails
    //             console.error('Failed to add to favorites')
    //             return
    //         }
    //     }

    //     // Update favoriteItems array based on the response
    //     const updatedFavoriteItems = updatedProductIds.map((productId) => ({
    //         item_id: productId,
    //         clicked_status: !isFavorite,
    //     }))

    //     // Update state with the new favoriteItems array
    //     setFavoriteItems(updatedFavoriteItems)

    //     // Update matchingProductIds to instantly reflect UI changes
    //     setmatchingProductIds(updatedProductIds)
    // }

    const showModal = (productDetails) => {
        setSelectedItem(productDetails)
        setCartModalVisible(true)
    }
    const handleOpenCartModal = async (item) => {
        try {
            const response = await fetch(
                'http://13.239.122.212:8080/api/products/getProductById',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: item.id }),
                }
            )

            if (response.ok) {
                const productDetails = await response.json()
                showModal(productDetails)
            } else {
                console.error('Failed to fetch product details')
            }
        } catch (error) {
            console.error('Error fetching product details', error)
        }
    }

    const handleCardModal = async (item) => {
        const total = selectedItem.price * parseInt(quantity, 10)
        setSelectedProductIds((prevIds) => [...prevIds, item.id])
        setCartItems((prevItems) => prevItems + 1)
        setCartModalVisible(false)
        Toast.show({
            position: 'bottom',
            text1: 'Added to cart',
            text1Style: { color: 'white', backgroundColor: 'black' },
            type: 'info',
        })
        console.log('selectedProductIds', selectedItem.id)
        const existingProductIds = selectedItem.id
        const request_model = {
            userId: userId,
            // productIds: selectedProductIds,
            productIds: [selectedItem.id],
        }

        try {
            setIsLoading(true)

            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            const res = await axios.post(`${addToCart_URL}`, request_model, {
                headers: headers,
            })
            async function getCartCount() {
                try {
                    const res = await axios.post(
                        `${userCart_URL}`,
                        request_model,
                        {
                            headers: headers,
                        }
                    )

                    setCartCount(res.data.length)
                } catch (e) {
                    console.log(e)
                }
            }
            getCartCount()
        } catch (error) {
            console.log('Error ', error)
        } finally {
            setIsLoading(false)
        }
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
                                    {cartCount}
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
                    {allProducts.map((item, index) => (
                        <>
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
                                        onPress={() =>
                                            handleOpenCartModal(item)
                                        }
                                    >
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                marginRight: 30,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            handleOpenCartModal(item)
                                        }
                                    >
                                        <Text style={{ fontSize: 18 }}>
                                            {item.id}
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
                                            // name={
                                            //     favoriteItems.find(
                                            //         (favItem) =>
                                            //             favItem.item_id ===
                                            //             item.id
                                            //     )?.clicked_status
                                            //         ? 'heart'
                                            //         : 'heart-outline'
                                            // }
                                            name={
                                                matchingProductIds?.includes(
                                                    item.id
                                                )
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
                        </>
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
                                                style={[{ fontWeight: 'bold' }]}
                                            >
                                                Qty
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                        'space-between',
                                                    borderWidth: 1,
                                                    borderColor: 'black',
                                                    borderRadius: 5,
                                                    padding: 5,
                                                }}
                                            >
                                                <TextInput
                                                    style={{ flex: 1 }}
                                                    value={quantity}
                                                    keyboardType="numeric"
                                                    onChangeText={
                                                        handleQuantityChange
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <Text
                                        style={[
                                            {
                                                marginLeft: 90,
                                                fontWeight: 'bold',
                                            },
                                        ]}
                                    >
                                        Total : ₹{' '}
                                        {selectedItem.price *
                                            parseInt(quantity, 10)}
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
                                                color: 'white',
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
