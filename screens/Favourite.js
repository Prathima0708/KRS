import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import FavouriteCard from '../components/FavouriteCard'
import { products } from '../data/products'
import Header from '../components/Header'
import { fetchProductDetails, getFavoritesByUserId_URL, getFavorites_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Favourite = ({ navigation }) => {
    /***
     * Render User favourite Shops
     */
    const [favorites,setFavorites]=useState([]); 
    const[userId,setUserId]=useState('')
    const [fetchProductIds, setFetchProductIds] = useState([])
    const [productInfo,setProductInfo]=useState([])

    useEffect(() => {
     
        const getUserId = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')

                // Check if the value is present
                if (userid !== null) {
                    setUserId(userid)
                    console.log('User ID:', userId)
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
          let headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }
        async function getAllFavorites() {
          try {
            const res = await axios.post(`${getFavoritesByUserId_URL}`,request_body,{
                headers:headers
            });
      
            setFavorites(res.data);
            const productIds = res.data.reduce((acc, cartItem) => {
                acc.push(...cartItem.productIds)
                return acc
            }, [])
            setFetchProductIds(productIds)
          } catch (e) {
            console.log(e);
          }
        }
      
        getAllFavorites();
      }, [userId]);

      useEffect(() => {
        async function getProductDetails() {
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }
            try {
                const res = await axios.post(
                    `${fetchProductDetails}`,
                    fetchProductIds,
                    {
                        headers: headers,
                    }
                )
              
                console.log('each product details',res.data[0]?.brand)
                setProductInfo(res.data[0]?.brand)
            } catch (e) {
                console.log(e)
            }
        }

        getProductDetails()
    }, [userId,fetchProductIds])

    function renderMyFavouriteShops() {
        return (
            <View>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <FavouriteCard
                            image={item.image}
                            shop={productInfo?.description}
                           // shop={item.shop}
                            name={productInfo?.name}
                           // name={item.productIds}
                            price={item.price}
                        />
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 16,
                }}
            >
                <Header title="Favourite" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderMyFavouriteShops()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Favourite